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

module.exports = { getUserInfo };