const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Series = require("../models/series");

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