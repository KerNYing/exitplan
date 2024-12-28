// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const router = require("./routes/generalRoutes")

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 정적 파일 제공 (public 폴더)
app.use(express.static("./public"));

app.use(router);

// 클라이언트와 Socket.IO 통신
io.on("connection", (socket) => {
  console.log("새로운 유저가 연결되었습니다:", socket.id);

  // 클라이언트로부터 메시지 수신
  socket.on("send_message", (data) => {
    console.log(`유저 메시지: ${data.chat}`);
    // 모든 클라이언트에 메시지 브로드캐스트
    io.emit("receive_message", data);
  });

  // 클라이언트에게 socket.id 전송
  socket.emit("your_socket_id", socket.id);

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