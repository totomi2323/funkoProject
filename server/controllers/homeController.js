const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.home_get = asyncHandler( async(req,res, next) => {

    res.render("home" ,{title: "Home page" , user:req.user})
})