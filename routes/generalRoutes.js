const express = require("express");
const router = express.Router();
const path = require("path");

const generalController = require("../controllers/generalController");

router.get("/", generalController.home);
router.get("/signup", generalController.signup);
router.get("/game", generalController.game);

module.exports = router;