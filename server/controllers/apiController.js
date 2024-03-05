const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Series = require("../models/series");
const User = require("../models/user")

const getPagination = (page, size) => {
    const limit = size ? +size : 12;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

exports.get_items = asyncHandler(async(req,res,next) => {
    const {page,size,search} = req.query;

    let condition = search
    ? { name: { $regex: new RegExp(search), $options: "i" } }
    : {};

    const { limit, offset } = getPagination(page, size);

    Item.paginate(condition,{ offset, limit, populate: 'series' })
    .then((data) => {
        res.json({data: data});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
})

exports.like_item = asyncHandler( async(req,res,next) => {
  const data = req.body;


  const updateUser = await User.findOne({googleId : data.userGoogleId})
  const item = await Item.findById(data.itemId);

  let alreadyLiked = updateUser.wishlist.includes(item._id);

  if (alreadyLiked) {
    console.log("This item have been already liked")
    console.log(alreadyLiked)
  } else {
    updateUser.wishlist.push(item._id)
    await updateUser.save();
    console.log("This item have been added to the wishlist")
    console.log(alreadyLiked)
  }


  console.log("succes")
})