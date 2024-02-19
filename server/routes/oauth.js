const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user.js");

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  console.log("data", data);
}

router.get("/", async function (req, res, next) {
  const code = req.query.code;
  try {
    const redirectUrl = "http://127.0.0.1:5000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_APP_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    );
    const r = await oAuth2Client.getToken(code)
    console.log("TOKEN :" +r)
    await oAuth2Client.setCredentials(r.tokens);
    console.log("Tokens received");
    const user = oAuth2Client.credentials;
    // await getUserData(user.access_token);
    const ticket = await oAuth2Client.verifyIdToken({idToken: user.id_token, audience: process.env.GOOGLE_APP_ID})

    const payload = ticket.getPayload();
    console.log(ticket)
    console.log("--------")
    console.log(payload)
    const newUser = await new User({
      googleId: payload['sub'],
      name:payload['name'],
      email:payload['email'],
    }).save()
  
  } catch (err) {
    console.log(err)
    console.log("Error with signing in with google");
  }
});

module.exports = router;
