// rootURI 추출
// 현재는 rootURI가 곧 api server이기 때문에 변수설정
const rootURI = `${window.location.protocol}//${window.location.host}`

const opUserName = document.getElementById("opUserName");
const opUserRank = document.getElementById("opUserRank");
const opUserRecord = document.getElementById("opUserRecord");

async function getOpUserInfo() {
    try {
        const res = await fetch(`${rootURI}/opUser`);

        if (!res.ok) {
            throw new Error(res.status);
        }
        const data = await res.json();
        opUserName.textContent = data.userName;
        opUserRank.textContent = data.userRank;
        opUserRecord.textContent = data.userRecord;
        console.log(data);
    }
    catch (err) {
        console.log("error occurred!:", err);
    }
}

getOpUserInfo();