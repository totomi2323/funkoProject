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
  };
  console.log(payload);
  const jwtToken = jwt.sign({ userId: payload.sub }, process.env.SESSION_KEY);
  console.log("JWT TOKEN:" + jwtToken);

  let userExist = await User.findOne({ googleId: payload.sub }).collation({ locale: "en", strength: 2 })
  .exec();
  console.log("--------------")
  console.log(userExist)
  if (userExist) {
    console.log("USER EXISTS");
    const updateUserToken = await User.findByIdAndUpdate(userExist._id, {
      token: jwtToken,
    });
  } else {
    const newUser = await new User({
      googleId: payload.sub,
      name: payload.name,
      email: payload.email,
      token: jwtToken,
    }).save();
  
  }

  res.json({ token: jwtToken, userDetails });
});

router.get("/protected", verifyToken, (req, res) => {
  console.log("Access granted!");
  res.json({ message: "Access granted for user ID: " + req.userId });
});

function verifyToken(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.SESSION_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
}

router.post("/refresh-token", async (req, res) => {
  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  res.json(credentials);
});

module.exports = router;
