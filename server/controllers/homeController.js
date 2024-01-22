const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Item = require("../models/item");
const Series = require("../models/series")


const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.home_get = asyncHandler(async (req, res, next) => {
  const { page, size, name } = req.query;

  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  
Item.paginate(condition,{ offset, limit, populate: 'series' })
    .then((data) => {
        console.log(data)
        res.render("home", { title: "Home page", user: req.user, data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });

  
});
