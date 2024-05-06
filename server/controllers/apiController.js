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
  const {
    timestamp_img,
    price,
    quantity,
    contact,
    user,
    item,
    location,
    description,
  } = req.body;

  const findUser = await User.findOne({ googleId: user.uid }).exec();

  console.log(item._id);
  console.log(findUser._id);

  const newItemForSale = new ForSale({
    item: item._id,
    imgUrl: timestamp_img,
    available: findUser._id,
    price: price,
    quantity: quantity,
    contact: contact,
    description: description,
    location: location,
  });

  await newItemForSale.save();
  //Add newItemForSale to user sales.
  await User.updateOne(
    { googleId: user.uid },
    { $push: { sale: newItemForSale._id } }
  );

  console.log(price, quantity, contact);
});
