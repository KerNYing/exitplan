const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// token check 필요없음
router.post("/signupReq", authController.signUp);
router.post("/signin", authController.signIn);

module.exports = router;