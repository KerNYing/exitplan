// rootURI 추출
// 현재는 rootURI가 곧 api server이기 때문에 변수설정
const rootURI = `${window.location.protocol}//${window.location.host}`

const opUserName = document.getElementById("opUserName");
const opUserRank = document.getElementById("opUserRank");
const opUserRecord = document.getElementById("opUserRecord");

async function getOpUserInfo() {
    try {
        const res = await fetch(`${rootURI}/opUser`, {
            credentials: "same-origin"
        });

        if (!res.ok) {
            throw new Error(res.status);
        }
        const data = await res.json();
        opUserName.textContent = data.nickname;
        opUserRank.textContent = data.rank;
        opUserRecord.textContent = data.record;
        console.log(data);
    }
    catch (err) {
        console.log("error occurred!:", err);
    }
}

getOpUserInfo();