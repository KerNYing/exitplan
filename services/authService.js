// user password hashing 용 library
const bcrypt = require("bcrypt");
const saltRounds = 10;

// jwt 발행용 library
const jwt = require("jsonwebtoken");
// DB 조회필요
const User = require("../models/userModel");

// login login
const loginUser = async (userId, userPw) => {
  // DB에서 user 조회
  // user 존재
    // pw hash 가져올 것

  // user 미존재
  

  // password 조회
  // userPw 저장된 hash 비교
  bcrypt.compare(userPw, hash, function(err, result) {
    if (result === true) {
      console.log("correct password!");
      return { status: true, token, username: userId };
    }
    // password 불일치
    return { status: false, undefined, username: userId};
  });
  
};

module.exports = { loginUser };