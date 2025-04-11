// rootURI 추출
// 현재는 rootURI가 곧 api server이기 때문에 변수설정
const rootURI = `${window.location.protocol}//${window.location.host}`

// 상대방 이름
const opUserName = document.getElementById("opUserName");
// 상대방 등급
const opUserRank = document.getElementById("opUserRank");
// 상대방 전적
const opUserRecord = document.getElementById("opUserRecord");
// 나의 이름
const myUserName = document.getElementById("myUserName");
// 나의 등급
const myUserRank = document.getElementById("myUserRank");
// 나의 전적
const myUserRecord = document.getElementById("myUserRecord");

const getMyUserInfo = async function () {
        try {
            const res = await fetch(`${rootURI}/opUser`, {
                credentials: "same-origin"
            });
    
            if (!res.ok) {
                throw new Error(res.status);
            }
            const data = await res.json();
    
            // myUser info 반영
            myUserName.innerHTML += data.nickname;
            myUserRank.innerHTML += data.rank;
            myUserRecord.innerHTML += `승:${data.record[0]} / 패:${data.record[1]} / 무:${data.record[2]}`;
            console.log(data);
        }
        catch (err) {
            console.log("error occurred!:", err);
        }
};

getMyUserInfo();

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const size = 19;
const gap = canvas.width / (size + 1);
const stones = Array.from({ length: size }, () => Array(size).fill(null));

let color = 0;

function getColor(value) {
    if (color) {
        return "white";
    }
    else {
        return "black";
    }
}

let hoverX = -1, hoverY = -1;

function drawBoard() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "#000";

// 격자
for (let i = 1; i <= size; i++) {
    ctx.beginPath();
    ctx.moveTo(gap, i * gap);
    ctx.lineTo(size * gap, i * gap);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i * gap, gap);
    ctx.lineTo(i * gap, size * gap);
    ctx.stroke();
}

// 놓인 바둑알
for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
    if (stones[y][x]) {
        drawStone(x, y, stones[y][x], 1);
    }
    }
}

// 미리보기 바둑알 (hover 상태)
if (hoverX >= 0 && hoverY >= 0 && !stones[hoverY][hoverX]) {
    drawStone(hoverX, hoverY, 'black', 0.3); // 예: black으로 고정, 나중에 턴에 따라 바꿔도 됨
}
}

function drawStone(x, y, color, alpha = 1) {
    ctx.beginPath();
    ctx.arc((x + 1) * gap, (y + 1) * gap, gap / 2.5, 0, 2 * Math.PI);
    ctx.fillStyle = color === 'black' ? `rgba(0,0,0,${alpha})` : `rgba(255,255,255,${alpha})`;
    ctx.fill();
    ctx.stroke();
}

canvas.addEventListener("mousemove", (e) => {
const rect = canvas.getBoundingClientRect();
const x = Math.round((e.clientX - rect.left) / gap) - 1;
const y = Math.round((e.clientY - rect.top) / gap) - 1;
if (x >= 0 && x < size && y >= 0 && y < size) {
    hoverX = x;
    hoverY = y;
} else {
    hoverX = hoverY = -1;
}
drawBoard();
});

canvas.addEventListener("mouseout", () => {
hoverX = hoverY = -1;
drawBoard();
});

canvas.addEventListener("click", () => {
    if (hoverX >= 0 && hoverY >= 0 && !stones[hoverY][hoverX]) {
        color++;
        color%=2;
        stones[hoverY][hoverX] = getColor(color); // 차후에 턴 관리 로직으로 교체 가능
        drawBoard();
    }
});

drawBoard();

// progress bar 처리
const bar = document.querySelector('.progress-bar');
bar.classList.add('fill');

bar.addEventListener('animationend', () => {
alert('타임 오버!');
});