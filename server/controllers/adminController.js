const Admin = require("../models/admin");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.login_form = asyncHandler(async (req, res, next) => {
    let errors;
    errors = req.session.messages;
    res.render("login", { validationErrors: errors, title: "Login"});
  });

  
  exports.login_post = [
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .escape(),
  
    function (req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.render("login", { errors: errors.array() ,title: "Login" });
        return;
      } else {
        passport.authenticate("local", {
          successRedirect: "/home", 
          failureRedirect: "/",
          failureMessage: true,
        })(req, res, next);
      }
    },
  ];

  exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render("sign_up", {title: "Sign up"});
  });
  
  exports.sign_up_post = [
    body("name", "Name most be given.").trim().isLength({ min: 1 }).escape(),
    body("password")
      .exists()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .escape(),
    body("passwordConfirmation")
      .exists()
      .withMessage("Password confirmation is required")
      .custom((value, { req }) => {
        return value === req.body.password;
      })
      .withMessage("Password doesn't match")
      .escape(),
    body("secretKey")
      .exists()
      .withMessage("Secret key required")
      .custom((value) => {
        return value === process.env.SIGNUP_KEY;
      })
      .withMessage("Secret key isn't correct")
      .escape(),
  
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      let user = {};
  
      user.name = req.body.name;
  
      if (!errors.isEmpty()) {
        res.render("sign_up", { errors: errors.array(), user: user, title: "Sign up" });
        return;
      } else {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          if (err) {
            return next(err);
          } else {
            try {
              const admin = new Admin({
                name: req.body.name,
                password: hashedPassword,
              });
              const result = await admin.save();
              res.redirect("/");
            } catch (err) {
              return next(err);
            }
          }
        });
      }
    }),
  ];
  
  exports.log_out = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });