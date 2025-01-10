const express = require("express");
const router = express.Router();
const path = require("path");

const generalController = require("../controllers/generalController");
const userController = require("../controllers/userController");

router.get("/", generalController.home);
router.get("/signup", generalController.signup);
router.get("/game", generalController.game);
router.get("/opUser", userController.opUser);

module.exports = router;