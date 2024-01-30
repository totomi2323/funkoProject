const express = require('express');
const passport = require("passport");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin")
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const admin = await Admin.findOne({ name: username });
        if (!admin) {
          req.session.message = [];
          return done(null, false, { message: "Incorrect username or password" });
        } else {
          const match = await bcrypt.compare(password, admin.password);
          if (!match) {
            return done(null, false, { message: "Incorrect username or password" });
          }
          return done(null, admin);
        }
      } catch (err) { 
        return done(err);
      }
    })
  );
  
  passport.serializeUser((admin, done) => {
    done(null, admin.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const admin = await Admin.findById(id);
      done(null, admin);
    } catch (err) {
      done(err);
    }
  });

module.exports = passport;