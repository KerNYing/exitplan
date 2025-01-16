// db.js
const { MongoClient } = require("mongodb");

const uri = "mongodb://mongodb:27017/exitplanDB";
let client;
let db;

// 최초로 연결을 시도하고, 이미 연결되어 있으면 재사용
const connectDB = async () => {
  if (db) {
    return db;
  }
  client = new MongoClient(uri);
  await client.connect();
  db = client.db("exitplanDB");
  return db;
};

const getDB = () => {
  if (!db) {
    throw new Error("DB is not initialized. Call connectToDB() first.");
  }
  return db;
};

module.exports = { connectDB, getDB };