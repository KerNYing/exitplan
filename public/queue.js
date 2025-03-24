// rootURI 추출
// 현재는 rootURI가 곧 api server이기 때문에 변수설정
const rootURI = `${window.location.protocol}//${window.location.host}`

// 방만들기 버튼
const createGameRoomBtn = document.getElementById("createGameRoomBtn");
// 방만들기취소 버튼
const cancelCreateGameRoomBtn = document.getElementById("cancelCreateGameRoomBtn");
// 게임방 목록
const gameRoomListBoard = document.getElementById("gameRoomListBoard");
// 방만들기 탭
const createGameRoomTab = document.getElementById("createGameRoomTab");

// user 이름
const myUserName = document.getElementById("myUserName");
// user 등급
const myUserRank = document.getElementById("myUserRank");
// user 전적
const myUserRecord = document.getElementById("myUserRecord");

// 방만들기 관련 변수
// exitplan check 여부
const exitPlanCheckBox = document.getElementById("exitPlanCheckbox");
// 방제목
const roomName = document.getElementById("roomName");
// 모드
// 오리지널 모드
const originalModeCheckbox = document.getElementById("originalModeCheckbox");
// 프로 모드
const hardModeCheckbox = document.getElementById("hardModeCheckbox");
// 비밀방여부
const isHiddenRoomBtn = document.getElementById("isHiddenRoomBtn");
// 비밀번호
const hiddenRoomPassword = document.getElementById("hiddenRoomPassword");
// 방 생성하기 버튼
const insertGameRoomBtn = document.getElementById("insertGameRoomBtn");

// 방만들기 클릭
createGameRoomBtn.addEventListener('click', () => {
    gameRoomListBoard.classList.add('hidden');
    createGameRoomTab.classList.remove('hidden');
});

// 방만들기 취소
cancelCreateGameRoomBtn.addEventListener('click', () => {
    gameRoomListBoard.classList.remove('hidden');
    createGameRoomTab.classList.add('hidden');
});

const getMyInfo = async function () {
    try {
        const res = await fetch(`${rootURI}/opUser`, {
            credentials: "same-origin"
        });

        if (!res.ok) {
            throw new Error(res.status);
        }

        const data = await res.json();
        const nickname = document.createTextNode(data.nickname);
        const rank = document.createTextNode(data.rank);
        const record = document.createTextNode(`승:${data.record[0]} / 패:${data.record[1]} / 무:${data.record[2]}`);

        myUserName.appendChild(nickname);
        myUserRank.appendChild(rank);
        myUserRecord.appendChild(record);
    }
    catch (err) {
        console.log("error occurred!:", err);
    }
}

getMyInfo();

// game room 생성 시 각 항목 유효성 검증
const validateCreateRoom = function validateCreateRoom () {
    console.log("test: "+roomName.value);
    // 방제목 0자인지 확인
    if (roomName.value.length === 0) {
        alert("방제목을 입력하세요!");
        console.log("방제목 없음");
        return false;
    }
    // 방제목 20자인지 검증
    if (roomName.value.length > 20) {
        alert("방제목은 20자를 초과할 수 없습니다!");
        console.log("방제목 20자 초과");
        return false; 
    }

    // 검증사항이 다 확인된 경우 true 반환
    return true;
};

// game room 생성
const insertGameRoom = function () {
    validateCreateRoom();
};

// 게임방 생성 클릭
insertGameRoomBtn.addEventListener('click', (e) => {
    // 유효하지 않은 경우 이벤트 중단
    if (insertGameRoom()) return;
});