const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/exitplanDB";
const client = new MongoClient(uri);

const getUserInfo = async (userId) => {
    try { 
        await client.connect();
        
        const database = client.db('exitplanDB');
        const userinfos = database.collection("userinfos");

        const result = await userinfos.findOne({ id: userId }); 
       
        // console.log("typeof", typeof(result), " result: ", result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

const isUserIdRegistered = async (userId) => {
    try {
        await client.connect();
        
        const database = client.db('exitplanDB');
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