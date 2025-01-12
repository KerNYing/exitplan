// login 관련 처리 service
const { signUpUser, signInUser } = require('../services/authService');


// signup
exports.signUp = async (req, res) => {
  console.log("signUp started..");
  try {
    const requestBody = req.body;
    // console.log(req.body);
    // console.log("requestBody", requestBody);
    const result = await signUpUser(requestBody.userId, requestBody.userPw, requestBody.userEmail, requestBody.userNickname);

    console.log("signup!");
    res.redirect('/queue');
  } catch (error) {
    console.log(error);
  }
};

exports.signIn = async (req, res) => {
  try {
    // user id / pw data
    const { userId, userPw } = req.body;
    const result = await signInUser(userId, userPw);

    res.json({ success: true, message: "로그인 성공", data: result });
    
    // login 성공 시 /queue page로 이동
    return res.redirect('/queue');
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
