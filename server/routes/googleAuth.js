const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { OAuth2Client, UserRefreshClient } = require("google-auth-library");

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_APP_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

router.post("/", async (req, res) => {
  const code = req.body.code;

  const r = await oAuth2Client.getToken(code);

  await oAuth2Client.setCredentials(r.tokens);
  const user = oAuth2Client.credentials;
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: user.id_token,
    audience: process.env.GOOGLE_APP_ID,
  });
  const payload = ticket.getPayload();

  let userDetails = {
    given_name: payload.given_name,
    family_name: payload.family_name,
    uid: payload.sub,
    picture: payload.picture,
    wishlist: []
  };

  const jwtToken = jwt.sign({ payload },process.env.ACCESS_TOKEN_KEY, {expiresIn: '30m'});

  let userExist = await User.findOne({ googleId: payload.sub })
    .collation({ locale: "en", strength: 2 })
    .exec();
  if (userExist) {
    if (userExist.wishlist) {
      userDetails.wishlist = userExist.wishlist
    }
    const updateUserToken = await User.findByIdAndUpdate(userExist._id, {
      token: jwtToken,
    });
  } else {
    const newUser = await new User({
      googleId: payload.sub,
      name: payload.name,
      email: payload.email,
      token: jwtToken,
    }).save();  }

    userDetails = JSON.stringify(userDetails)
  res.json({ token: jwtToken, user : userDetails });
});

router.get("/protected", verifyToken, (req, res) => {
  console.log("Access granted!");
  res.json({ message: "Access granted for user ID: " + req.userId });
});

function verifyToken(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
}

router.post("/refresh-token", async (req, res) => {
 
});

module.exports = router;
