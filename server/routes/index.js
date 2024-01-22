const express = require('express');
const router = express.Router();


// const upload = require("../middleware/upload")
const checkLoggedIn = require("../middleware/checkLoggedIn")

const adminController = require("../controllers/adminController")
const homeController = require("../controllers/homeController")
const itemController = require("../controllers/itemController")

router.get('/', adminController.login_form);
router.post('/', adminController.login_post )

router.get("/signup", adminController.sign_up_get);
router.post("/signup", adminController.sign_up_post)
router.get("/logout", adminController.log_out)

router.get("/home", checkLoggedIn, homeController.home_get );


router.get("/update/:id" , checkLoggedIn , itemController.get_update_item)

module.exports = router;