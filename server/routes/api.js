const express = require('express');
const router = express.Router();

const apiController = require("../controllers/apiController")

router.get("/home", apiController.get_items )


module.exports = router; 
