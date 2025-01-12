const socket = io(); // 서버와 연결

const messageInput = document.getElementById("messageInput");
const messageLog = document.getElementById("messageLog");

// 스크롤을 가장 아래로 이동하는 함수
function scrollToBottom() {
  messageLog.scrollTop = messageLog.scrollHeight;
}

function getCookieValue(cookieName) {
  const cookies = document.cookie.split("; "); // 쿠키 문자열 분리
  for (const cookie of cookies) {
    const [key, value] = cookie.split("="); // 키와 값 분리
    if (key === cookieName) {
      return value; // 키와 일치하는 값 반환
    }
  }
  return null; // 키가 없으면 null 반환
}

// 메시지 전송 함수
function sendMessage() {
  const socketId = getCookieValue("socket_id");
  const message = messageInput.value;


  if (message.trim() !== "") {
    socket.emit("send_message", 
      {'id': socketId,
      'chat': message}); // 서버에 메시지 전송
    
    messageInput.value = "";
  }

  messageLog.innerHTML += `
    <div style='margin: 2px'>
    나<br>
    ${message}
    </div>
  `;

  scrollToBottom();
}

// 서버로부터 socket.id 수신
socket.on("your_socket_id", (id) => {
  console.log(`서버로부터 받은 socket.id: ${id}`);
  
  // 쿠키에 socket.id 저장
  document.cookie = `socket_id=${id}; path=/;`;
});

// 서버로부터 메시지 수신
socket.on("receive_message", (data) => {
  const socketId = getCookieValue("socket_id");
  if (socketId != data.id) {
    messageLog.innerHTML += `
    <div>
    ${data.id}<br>
    ${data.chat}
    </div>
  `;
  }
  // messageLog.appendChild(messageItem);
});



// 사용 예시
// const socketId = getCookieValue("socket_id");
// console.log("Socket ID:", socketId);