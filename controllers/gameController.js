import GameInfo from "../models/gameInfo";

const path = require('path');
// const {  } = require('../services/gameService');

// jwt module
const jwt = require('jsonwebtoken');
// filesystem module
const fs = require('fs');
// path module
const path = require('path');

// privatekey path
const privateKeyPath = path.join(__dirname,'..','/env/private.key');
// privatekey fs object
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

// 
exports.insertGameRoom = async (req, res) => {
    try {
        // ownerId 획득
        const token = req.cookies?.token;
        let ownerId;
        jwt.verify(token, privateKey, async (err, decoded) => {
            ownerId = decoded.id;
        });

        // request 정보 가져오기
        const data = req.body;
        // queue에서 가져오는 정보
        // gameName roomName ownerId isHiddenRoom hiddenRoomPw gameMode
        const gameName = data.gameName;
        const roomName = data.roomName;
        const isHiddenRoom = data.isHiddenRoom;
        const hiddenRoomPw = data.hiddenRoomPw;
        const gameMode = data.gameMode;

        // server 측에서 처리해줘야할 정보
        // gameId userIds viewerIds score playerNum viewerNum, playTime, playTimeAt
        const gameInfo = new GameInfo(gameName, roomName, ownerId, isHiddenRoom, hiddenRoomPw, gameMode);

        const result = await insertGameInfo(gameInfo);

        // 정상적으로 게임방 정보가 등록된 경우
        if (result.status === "sucess") {
            // gameId를 기준으로 게임방 찾아들어가기
            // gameId를 쿼리로 /game에 진입
            res.redirect(`/game?gameId=${gameInfo._gameId}`);
        }

        // 게임방 정보등록 실패 시 /queue 으로 redirect
        res.redirect("/queue");
    }
    catch (err) {
        console.log("err gameController.insertGameRoom")
    }
};