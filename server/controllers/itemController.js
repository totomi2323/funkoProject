const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Series = require("../models/series");

exports.get_update_item = asyncHandler(async (req,res,next) => {
    let updateItem = await Item.findById(req.params.id).populate("series").exec();


    res.render("item_form", {item : updateItem})
})
