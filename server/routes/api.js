const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const apiController = require("../controllers/apiController")

router.get("/home", apiController.get_items )

router.get("/wishlist/:id", verifyToken, apiController.get_wishlist) 

router.post("/wishlist/add", verifyToken ,apiController.like_item)
router.post("/wishlist/remove", verifyToken ,apiController.dislike_item)

router.get("/item/:id", verifyToken, apiController.get_item)


module.exports = router; 


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