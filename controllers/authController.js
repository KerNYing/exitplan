// login 관련 처리 service
const { signUpUser, signInUser } = require('../services/authService');


// signup
exports.signUp = async (req, res) => {
  console.log("signUp started..");
  try {
    const requestBody = req.body;
    // singup 결과 반환
    const result = await signUpUser(requestBody.userId, requestBody.userPw, requestBody.userEmail, requestBody.userNickname);

    // /queue page로 이동
    res.cookie("token", result.token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    })
    .redirect('/queue');
  } catch (error) {
    console.log(error);
  }
};

exports.signIn = async (req, res) => {
  try {
    // user id / pw data
    const { userId, userPw } = req.body;
    const result = await signInUser(userId, userPw);
    console.log("result: ", result);

    if (result.status === 'success') {
      // /queue page로 이동
      res.cookie("token", result.token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      })
      // login 성공 시 /queue page로 이동
      .redirect('/queue');
    }
    else {
      res.json({ success: false, message: "로그인 성공", data: result });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
