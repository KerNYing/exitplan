const { loginUser } = require("../services/authService");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await loginUser(username, password);
    res.json({ success: true, message: "로그인 성공", data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { login };