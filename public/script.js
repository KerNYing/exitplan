const socket = io(); // 서버와 연결

const messageInput = document.getElementById("messageInput");
const messageLog = document.getElementById("messageLog");

// 메시지 전송 함수
function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== "") {
    socket.emit("send_message", message); // 서버에 메시지 전송
    messageInput.value = "";
  }
}

// 서버로부터 메시지 수신
socket.on("receive_message", (data) => {
  const messageItem = document.createElement("li");
  messageItem.textContent = data;
  messageLog.appendChild(messageItem);
});