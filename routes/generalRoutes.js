// express module
const express = require("express");
// router module for routing
const router = express.Router();
// path module
const path = require("path");

// token 유무/유효성 check 목적 middleware
const checkToken = require("../middleware/checkToken");

// 일반적인 control 목적 controller
const generalController = require("../controllers/generalController");
// 유저정보 관련 control 목적 controller
const userController = require("../controllers/userController");

// token check 필요없음
router.get("/", generalController.home);
router.get("/signup", generalController.signup);

// token check 필요
// checkToken middleware 적용
router.get("/game", checkToken, generalController.game);
router.get("/opUser", checkToken, userController.opUser);
router.get("/queue", checkToken, generalController.queue);
router.get("/userinfo/", checkToken, generalController.userinfo);

module.exports = router;