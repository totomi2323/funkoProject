const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


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

  Item.paginate(condition, { offset, limit, populate: "series" })
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
  console.log(user);
  res.json(user.wishlist);
});

exports.get_item = asyncHandler(async (req, res, next) => {
  const itemId = req.params.id;

  let item = await Item.findById(itemId).populate("series").exec();

  res.json(item);
});

exports.add_item_forsale = asyncHandler(async (req, res, next) => {

  console.log(req.body)
  console.log(req.file)
  
  const {
   data, userID, itemID
  } = req.body;

  let parsedData = JSON.parse(data)

  console.log(parsedData)
  

  const findUser = await User.findOne({ googleId: userID }).exec();

  console.log(findUser._id);
  console.log("File name:" + req.file.filename)

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
  await Item.updateOne({_id : itemID}, {$push: {available: findUser._id}})
    res.send(200)
});
