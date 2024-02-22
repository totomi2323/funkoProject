const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client, UserRefreshClient } = require("google-auth-library");
const redirectUrl = "http://127.0.0.1:5000/googleAuth";

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_APP_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

router.post("/", async (req, res) => {
  const code = req.body.code;
  console.log("Code:");
  console.log(code); 

   const tokens = await oAuth2Client.getToken(code);
  console.log(tokens);

  res.json(tokens);
}); 

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
