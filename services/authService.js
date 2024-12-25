const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("유저가 존재하지 않습니다.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("비밀번호가 일치하지 않습니다.");

  // JWT 토큰 생성
  const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

  return { token, username: user.username };
};

module.exports = { loginUser };