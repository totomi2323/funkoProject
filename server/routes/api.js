const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const upload = require("../middleware/upload")


const apiController = require("../controllers/apiController")

router.get("/home", apiController.get_items )

router.get("/wishlist/:id", verifyToken, apiController.get_wishlist) 

router.post("/wishlist/add", verifyToken ,apiController.like_item)
router.post("/wishlist/remove", verifyToken ,apiController.dislike_item)

router.get("/item/:id", verifyToken, apiController.get_item)

router.get("/sale/:id", verifyToken , apiController.get_own_sales) 

router.get("/seller/:id" , apiController.get_public_sales) 

router.post("/sale/delete", verifyToken, apiController.delete_sale);

router.post("/sell/add" ,verifyToken, upload.single('file'), apiController.add_item_forsale)

router.post("/user/change_name", verifyToken, apiController.change_name)
router.post("/user/contact/add", verifyToken, apiController.add_contact)
router.post("/user/contact/delete", verifyToken, apiController.delete_contact )


module.exports = router; 


function verifyToken(req, res, next) {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ error: "Invalid token" });
      req.userDetails = decoded.userDetails;
      next();
    });
  }