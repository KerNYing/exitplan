// gameId hashing 용 library
const bcrypt = require("bcrypt");
const saltRounds = 10;

// DB 연결 관련 확인 함수
const { connectDB, getDB } = require("../config/db");

// 게임방 조회
// 대략적인 정보 반환
const getRoomSurInfo = async () => {
    try {
        // DB 객체 받아옮
        await connectDB();
        const database = getDB();
        // queueInfo에 대한 colleciton 설정
        const queueInfo = database.collection("QueueInfo");
        // const result = await queueInfo.


    } catch (error) {
        console.log("fun: getRoomInfo error occurred: "+error.message);
    }
};

// 게임방 생성
// 외부 parameter: 게임이름(종류), 방이름, 비밀방여부, 생성유저ID
const createRoom = async (gameName, roomName, isHiddenRoom, ownerId) => {
    try {
        // DB 객체 받아옮
        await connectDB();
        const database = getDB();
        // queueInfo에 대한 collection 설정
        const queueInfo = database.collection("QueueInfo");
        // 게임방 ID 생성
        const gameId = await byrcpt.hash(gameName, saltRounds);
        // 게임방정보 저장
        const result = await queueInfos.insertOne({
            gameId: gameId,
            gameName: gameName,
            roomName: roomName,
            ownerId: ownerId,
            isHiddenRoom: isHiddenRoom,
            // 최초 플레이어는 1명
            playerNum: 1,
            // 최초 관전자는 0명
            viwerNum: 0
        });
    } catch (error) {
        console.log("fun: createRoom error occurred: "+error.message);
    }
}

module.exports = { getRoomSurInfo, createRoom };