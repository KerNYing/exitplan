// express module
const express = require("express");
// router module for routing
const router = express.Router();
// path module
const path = require("path");
// game 과 관련된 controller
const gameController = require("../controllers/gameController");

// game room 만들기 위한 요청 routing
router.post("/game", gameController.insertGameRoom);

// game room 정보 요청 routing
router.get("/gameRoom", gameController.getGameRooms);

module.exports = router;
