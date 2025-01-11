// login 관련 처리 service
const { loginUser } = require('../services/authService');

exports.login = async (req, res) => {
  try {
    // user id / pw data
    const { userId, userPw } = req.body;
    const result = await loginUser(userId, userPw);

    res.json({ success: true, message: "로그인 성공", data: result });
    
    // login 성공 시 /queue page로 이동
    return res.redirect('/queue');
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};