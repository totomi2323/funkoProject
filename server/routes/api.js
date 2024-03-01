const express = require('express');
const router = express.Router();

const apiController = require("../controllers/apiController")

router.get("/home", apiController.get_items )

router.post("/wishlist/add" ,apiController.like_item)

module.exports = router; 
