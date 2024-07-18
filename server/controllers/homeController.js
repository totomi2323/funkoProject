const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Item = require("../models/item");
const Series = require("../models/series")
const User = require("../models/user")


const getPagination = (page, size) => {
  const limit = size ? +size : 20;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.home_get = asyncHandler(async (req, res, next) => {
  const { page, size, search } = req.query;

  let condition = search
    ? { name: { $regex: new RegExp(search), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  
Item.paginate(condition,{ offset, limit, populate: 'series available.user' })
    .then((data) => {
        res.render("home", { title: "Home page", user: req.user, data: data , searchName: search});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });

  
});
