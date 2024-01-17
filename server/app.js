const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

require("dotenv").config()

const indexRouter = require("./routes/index.js");
const app = express();
const cors = require('cors')

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const Admin = require("./models/admin.js")

mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_CONNECTION;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(session({ secret: process.env.SESSION_KEY, resave: false, saveUninitialized: false,
  cookie: {
      secure: false,
      maxAge: 3600000 
  } }));
app.use(passport.initialize());
app.use(passport.session());



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

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

module.exports = app;
