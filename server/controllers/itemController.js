const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Series = require("../models/series");

exports.get_create_item = asyncHandler(async (req, res, next) => {
  res.render("item_form", { user: req.user, title: "Create item" });
});

exports.get_update_item = asyncHandler(async (req, res, next) => {
  let updateItem = await Item.findById(req.params.id).populate("series").exec();

  const { search } = req.query;
  let findSeries = false;
  if (search) {
    findSeries = await Series.find({
      name: { $regex: new RegExp(search), $options: "i" },
    }).exec();
  }

  res.render("item_form", {
    item: updateItem,
    searchedSeries: findSeries,
    user: req.user,
  });
});

exports.post_update_item = [
  (req, res, next) => {
    if (!(req.body.series instanceof Array)) {
      if (typeof req.body.series === "undefined") {
        req.body.series = [];
      } else {
        req.body.series = new Array(req.body.series);
      }
    }
    next();
  },
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      imgUrl: req.body.imgUrl,
      series: typeof req.body.series === "undefined" ? [] : req.body.series,
      available: true,
      price: req.body.price,
      alt: req.body.alt,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      let reloadItem = await Item.findById(req.params.id)
        .populate("series")
        .exec();

      res.render("item_form", {
        item: reloadItem,
        user: req.user,
        errors: errors.array(),
      });
      //rerender update
      return;
    } else {
      const updateItem = await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect("/home");
    }
  }),
];
