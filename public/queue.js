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

async function getOpUserInfo() {
    try {
        const res = await fetch(`${rootURI}/opUser`, {
            credentials: "same-origin"
        });

        if (!res.ok) {
            throw new Error(res.status);
        }
        const data = await res.json();
        myUserName.textContent = data.nickname;
        myUserRank.textContent = data.rank;
        myUserRecord.textContent = `승:${data.record[0]} / 패:${data.record[1]} / 무:${data.record[2]}`;
        console.log(data);
    }
    catch (err) {
        console.log("error occurred!:", err);
    }
}

getOpUserInfo();