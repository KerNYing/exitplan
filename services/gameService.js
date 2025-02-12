// DB 연결 관련 확인 함수
const { connectDB, getDB } = require("../config/db");

// 게임방 조회
const getRoomInfo = async () => {
    try {
        // DB 객체 받아옮
        await connectDB();
        const database = getDB();


    } catch (error) {
        console.log("fun: getRoomInfo error occurred");
    }
};

// 게임방 생성
const createRoom = async () => {
    try {
        // DB 객체 받아옮
        await connectDB();
        const database = getDB();

    } catch (error) {
        console.log("fun: createRoom error occurred");
    }
}

module.exports = { getRoomInfo, createRoom };