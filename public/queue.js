const createGameRoomBtn = document.getElementById("createGameRoomBtn");
const cancelCreateGameRoomBtn = document.getElementById("cancelCreateGameRoomBtn");

const gameRoomListBoard = document.getElementById("gameRoomListBoard");
const createGameRoomTab = document.getElementById("createGameRoomTab");

createGameRoomBtn.addEventListener('click', () => {
    gameRoomListBoard.classList.add('hidden');
    createGameRoomTab.classList.remove('hidden');
});

cancelCreateGameRoomBtn.addEventListener('click', () => {
    gameRoomListBoard.classList.remove('hidden');
    createGameRoomTab.classList.add('hidden');
});