// login 관련 처리 service
const { signUpUser, signInUser } = require('../services/authService');
const oauth2ReqUrl = require('../middleware/oauth2');

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
      .redirect("/queue");
    }
    else {
      res.redirect("/loginFailed");
    }
  } catch (error) {
    res.status(400).redirect("/loginFailed");
  }
};

// signin with google OAuth 2.0
exports.signInWithGoogle = async (req, res) => {
  console.log("oauth: ", oauth2ReqUrl);
  res.json({oauth2ReqUrl});
};