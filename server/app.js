const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

require("dotenv").config()
const localLogin = require("./functions/adminLogin.js")
const indexRouter = require("./routes/index.js");
const app = express();
const cors = require('cors')
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("./models/user")

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

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});


module.exports = app;


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  console.log(profile)
  let newUser =   new User({
    googleId: profile.id,
    name: profile.displayName,
    email: profile.emails[0],
    wishlist: [],
    collection: [],
    sale: [],
  }).save();
  // Validate the user based on the provided Google profile information
  // Save user information to the database or session if needed
  return done(null, profile);
}
));
app.post('/auth/google', passport.authenticate('google-token', { session: false }), (req, res) => {
  res.json({ user: req.user });
});
app.post('/google/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logged out successfully' });
});