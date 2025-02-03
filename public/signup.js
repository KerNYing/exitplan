// ID 입력
const userId = document.getElementById("userId");
// ID 중복확인 버튼
const idConflictCheckBtn = document.getElementById("idConflictCheckBtn");
// 아이디 중복 확인 문구공간
const userIdCheckSentence = document.getElementById("userIdCheckSentence");
// PW 입력
const userPw = document.getElementById("userPw");
// PW 재입력
const userPwCheck = document.getElementById("userPwCheck");
// PW 재입력 관련 문구공간
const userPwCheckSentence = document.getElementById("userPwCheckSentence");
// PW 조건 관련 문구공간
const userPwConditionCheckSentence = document.getElementById("userPwConditionCheckSentence");
// Email 입력
const userEmail = document.getElementById("userEmail");
// Nickname 입력
const userNickname = document.getElementById("userNickname");
// 회원가입 버튼
const signUpBtn = document.getElementById("signUpBtn");

// 8~12자, 알파벳 대문자, 소문자, 숫자, 특수기호를 포함하는 비밀번호에 대한 정규표현식
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,14}$/;

// email 검증을 위한 정규표현식
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

// 비밀번호 검증함수
function isValidPassword(str) {
    return passwordRegex.test(str);
}

// 이메일 검증함수
function isValidEmail(str) {
   return emailRegex.test(str);
}

idConflictCheckBtn.addEventListener('click', async () => {
    await fetch(`/userinfo?userId=${encodeURIComponent(userId.value)}`)
    .then(res => res.json())
    .then(data => {
        if(data.isUserIdRegistered) {
            userIdCheckSentence.textContent = "이미 존재하는 아이디입니다.";
        }
        else {
            userIdCheckSentence.textContent = "사용가능한 아이디입니다.";
        }
    })
});

// 모든 input에 대한 입력 검증함수
function validateAllFields() {
    // ID는 좌우공백제외 최소 1글자 이상인 경우 정상으로 설정
    const isUserIdValid = userId.value.trim().length > 0;
    const isUserPwValid = isValidPassword(userPw.value);
    const isUserPwCheckValid = isValidPassword(userPwCheck.value);
    const isUserEmail = isValidEmail(userEmail.value);
    const isUserNickname = userNickname.value.trim().length >= 0;

    return isUserIdValid && isUserPwValid && isUserPwCheckValid && isUserEmail && isUserNickname;
}

// input 값 검증 후 signUpBtn 활성화/비활성화 처리로직
function handleInputChange() {
    if (validateAllFields()) {
      signUpBtn.disabled = false;
    } else {
      signUpBtn.disabled = true;
    }
}

// 각 input 별 keyup event 발생 시 
[userId, userPw, userPwCheck, userEmail, userNickname].forEach(input => {
    input.addEventListener("keyup", handleInputChange);
});

// PW 검증
userPw.addEventListener('keyup', () => {
    if (!isValidPassword(userPw.value)) {
        userPwConditionCheckSentence.textContent = "비밀번호 규칙에 맞지 않습니다.";
    }
    else {
        userPwConditionCheckSentence.textContent = "";
    }
})

// PW 일치 검증
userPwCheck.addEventListener('keyup', () => {
    if (userPw.value !== userPwCheck.value) {
        userPwCheckSentence.textContent = "비밀번호가 일치하지 않습니다!";
    }
    else {
        userPwCheckSentence.textContent = "";
    }
});

