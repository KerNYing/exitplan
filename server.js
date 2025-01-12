// server.js
// experss server setup
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// key check
const keyPair = require('./config/keypair');

// router 연결
const generalRouter = require("./routes/generalRoutes");
const authRouter = require("./routes/authRoutes");

// configuration
// config DB
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const dbschemas = require("./db/dbSchemas")

app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded 파싱
app.use(express.json()); // JSON 데이터 파싱

// 정적 파일 제공 (public 폴더)
app.use(express.static("./public"));

app.use(generalRouter);
app.use(authRouter);

// 클라이언트와 Socket.IO 통신
io.on("connection", (socket) => {
  console.log("새로운 유저가 연결되었습니다:", socket.id);

  // 클라이언트로부터 메시지 수신
  socket.on("send_message", (data) => {
    console.log(`유저 메시지: ${data}`);
    // 모든 클라이언트에 메시지 브로드캐스트
    io.emit("receive_message", data);
  });

  // 유저 연결 해제
  socket.on("disconnect", () => {
    console.log("유저 연결 해제:", socket.id);
  });
});

// 서버 실행
const PORT = 80;
server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

const uri = "mongodb://localhost:27017/exitplanDB";
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

run();
