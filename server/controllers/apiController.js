const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

const Item = require("../models/item");
const Series = require("../models/series");
const User = require("../models/user");
const ForSale = require("../models/forSale");

const getPagination = (page, size) => {
  const limit = size ? +size : 16;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.get_items = asyncHandler(async (req, res, next) => {
  const { page, size, search } = req.query;

  let condition = search
    ? { name: { $regex: new RegExp(search), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  Item.paginate(condition, {
    offset,
    limit,
    populate: "series available.user",
    sort: { available: -1 },
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

exports.like_item = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const updateUser = await User.findOne({ googleId: data.userGoogleId });
  const item = await Item.findById(data.itemId);

  let isItLiked = updateUser.wishlist.includes(item._id);

  if (!isItLiked) {
    await User.updateOne(
      { googleId: data.userGoogleId },
      { $push: { wishlist: item._id } }
    );
  }
});

exports.dislike_item = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const updateUser = await User.findOne({ googleId: data.userGoogleId });
  const item = await Item.findById(data.itemId);

  let isItLiked = updateUser.wishlist.includes(item._id);

  if (isItLiked) {
    await User.updateOne(
      { googleId: data.userGoogleId },
      { $pull: { wishlist: item._id } }
    );
  }
});

exports.get_wishlist = asyncHandler(async (req, res, next) => {
  const userID = req.params.id;

  let user = await User.findOne({ googleId: userID })
    .populate("wishlist")
    .exec();

  res.json(user.wishlist);
});

exports.get_item = asyncHandler(async (req, res, next) => {
  const itemId = req.params.id;

  let item = await Item.findById(itemId).populate("series").exec();

  res.json(item);
});

exports.add_item_forsale = asyncHandler(async (req, res, next) => {
  const { data, userID, itemID } = req.body;

  let parsedData = JSON.parse(data);

  const findUser = await User.findOne({ googleId: userID }).exec();

  const newItemForSale = new ForSale({
    item: itemID,
    imgUrl: req.file.filename,
    available: findUser._id,
    price: parsedData.price,
    quantity: parsedData.quantity,
    contact: parsedData.contact,
    description: parsedData.description,
    location: parsedData.location,
  });

  await newItemForSale.save();
  //Add newItemForSale to user sales.
  await User.updateOne(
    { googleId: userID },
    { $push: { sale: newItemForSale._id } }
  );
  await Item.updateOne(
    { _id: itemID },
    {
      $push: {
        available: {
          user: findUser._id,
          price: parsedData.price,
          saleId: newItemForSale._id,
        },
      },
    }
  );
  res.send(200);
});

exports.get_sales = asyncHandler(async (req, res, next) => {
  const userID = req.params.id;

  let user = await User.findOne({ googleId: userID })
    .populate({ path: "sale", populate: { path: "item" } })
    .exec();

  res.json(user.sale);
});

exports.delete_sale = asyncHandler(async (req, res, next) => {
  const data = req.body;

  await ForSale.findByIdAndDelete(data._id);
  await Item.updateOne(
    { _id: data.item._id },
    { $pull: { available: { $elemMatch: { saleId: data._id } } } }
  );
  await User.updateOne({ _id: data.available }, { $pull: { sale: data._id } });

  let path = "./public/images/" + data.imgUrl;

  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
});

exports.change_name = asyncHandler(async (req, res, next) => {
  const data = req.body;

  let userDetails = req.userDetails;
  userDetails.nickName = data.newNickname;

  jwtToken = jwt.sign({ userDetails }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "1h",
  });


  await User.updateOne(
    { googleId: data.userGoogleId },
    { nickName: data.newNickname }
  );
  userDetails = JSON.stringify(userDetails)
  res.json({ token: jwtToken, user : userDetails });
});

exports.add_contact = asyncHandler(async(req,res,next) => {
  const data = req.body;

  console.log(data)

  let userDetails = req.userDetails;
  userDetails.contact.push(data.newContact);

  jwtToken = jwt.sign({ userDetails }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "1h",
  });
  await User.updateOne(
    { googleId: data.userGoogleId },
    { $push: { contact: data.newContact } }
  );
  userDetails = JSON.stringify(userDetails)
  res.json({ token: jwtToken, user : userDetails });
})