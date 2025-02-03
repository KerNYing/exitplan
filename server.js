// server.js
// experss server setup
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const path = require('path');

// cors option
const cors = require('cors');

// key check
const keyPair = require('./config/keypair');

// router 연결
const generalRouter = require("./routes/generalRoutes");
const authRouter = require("./routes/authRoutes");

// cookie 관련
const cookieParser = require('cookie-parser');

// configuration
// config DB
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const dbschemas = require("./db/dbSchemas");

// cors middleware use
// app.use(cors({
//   origin: '*',
//   methods: '*'
// }));
// x-www-form-urlencoded 파싱
app.use(express.urlencoded({ extended: true })); 
// JSON 데이터 파싱
app.use(express.json()); 


app.use(cookieParser());
app.use(express.static("./dist"));
app.use(generalRouter);

// 정적 파일 제공 (public 폴더)
app.use(express.static("./public"));




app.use(authRouter);

const uri = "mongodb://mongodb:27017/exitplanDB";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('exitplanDB');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
    mongoose.connect(uri, { useNewUrlParser: true });
    console.log("seccessfully connected!!");
  }
}
// 서버 실행
const PORT = 80;
server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

run();
