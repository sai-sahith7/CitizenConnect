const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/otp", authController.generateOTP);
router.post("/verify", authController.verifyOTP);

module.exports = router;
