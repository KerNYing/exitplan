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

(function() {
    async function getMyUserInfo() {
        try {
            const res = await fetch(`${rootURI}/opUser`, {
                credentials: "same-origin"
            });
    
            if (!res.ok) {
                throw new Error(res.status);
            }
            const data = await res.json();
    
            // myUser info 반영
            // myUserName.textContent = data.nickname;
            myUserRank.textContent = data.rank;
            myUserRecord.textContent = `승:${data.record[0]} / 패:${data.record[1]} / 무:${data.record[2]}`;
            console.log(data);
        }
        catch (err) {
            console.log("error occurred!:", err);
        }
    }
})();