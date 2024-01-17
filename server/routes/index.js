const express = require('express');
const router = express.Router();


// const upload = require("../middleware/upload")


const adminController = require("../controllers/adminController")

router.get('/', adminController.login_form);
router.post('/', adminController.login_post )

router.get("/signup", adminController.sign_up_get);
router.post("/signup", adminController.sign_up_post)

router.get("/home", )

module.exports = router;