const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");

async function getUserData(access_token) {
  const response = await fetch(
    `https://googleapis.com/oath2/v3/userinfo?access_token${access_token}`
  );
  const data = await response.json();
  console.log("data", data);
}

router.get("/", async function (req, res, next) {
  const code = req.query.code;
  console.log("Code :" + code);
  try {
    const redirectUrl = "http://127.0.0.1:5000/oath";
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_APP_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    );
    const r = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(r.tokens);
    console.log("Tokens received");
    const user = oAuth2Client.credentials;
    console.log("credentials", user);

     await getUserData(user.access_token);

  
  } catch (err) {

    console.log("Error with signing in with google");
  }
});

module.exports = router;
