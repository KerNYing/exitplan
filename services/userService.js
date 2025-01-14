// DB 연결 관련 확인 함수
const { connectDB, getDB } = require("../config/db");

// user 전체정보 조회 함수
const getUserInfo = async (userId) => {
    try { 
        await connectDB();
        const database = getDB();
        const userinfos = database.collection("userinfos");

        const result = await userinfos.findOne({ id: userId }); 
       
        // console.log("typeof", typeof(result), " result: ", result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

// userId 등록여부 확인 함수
const isUserIdRegistered = async (userId) => {
    try {
        await connectDB();
        const database = getDB();
        const userinfos = database.collection("userinfos");
        // db에서 주어진 userId에 대한 document count 조회
        // countDocuments를 활용해야 다른 정보의 접근을 예방가능
        const result = await userinfos.countDocuments({ id: userId }, { limit: 1 });
        // user 존재
        if (result) return true;
        // user 미존재
        else return false;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getUserInfo, isUserIdRegistered };