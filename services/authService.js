// user password hashing 용 library
const bcrypt = require("bcrypt");
const saltRounds = 10;

// jwt 발행용 library
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');

// 키 파일 경로
const privateKeyPath = path.join(__dirname,'..','/env/private.key');
const publicKeyPath = path.join(__dirname,'..','/env/public.key');
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const publicKey  = fs.readFileSync(publicKeyPath, 'utf8');

// DB 조회필요
const { UserInfo } = require('../db/dbSchemas');
const { connectDB, getDB } = require('../config/db');

// signup logic
const signUpUser = async (userId, userPw, userEmail, userNickname) => {
  try {
    await connectDB();
    console.log("Successfully connected to MongoDB");
  } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw new Error("MongoDB 연결에 실패했습니다.");
  }
  
  console.log("signup service started..");
  try {
    const now = new Date(Date.now());

    const hashedPw = await bcrypt.hash(userPw, saltRounds);

    // 각 구성 요소 추출
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(now.getDate()).padStart(2, '0');

    // 원하는 형식으로 조합
    const formattedDate = `${year}-${month}-${day}`;

    // data 저장
    console.log(hashedPw);
    console.log("user creating..");
    // db configuration
    const database = getDB();
    const userinfos = database.collection("userinfos");

    console.log("done");

    // user info insert to db
    const result = await userinfos.insertOne({
      id: userId, 
      pw: hashedPw, 
      email: userEmail, 
      nickname: userNickname, 
      createdAt: formattedDate, 
      rank: "Bronze",
      provider: ['local'],
      record: [0, 0, 0],
      providerId: "" 
    });

    // userId 와 같이 jwt 생성
    const token = jwt.sign({ id: userId }, privateKey, { algorithm: 'RS256' });
    result['token'] = token;

    console.log("User created:", result.insertedId);
    return result;
  } catch(error) {
    console.log(error);
  }
};


// login logic
const signInUser = async (userId, userPw) => {
  // DB연결
  try {
    await connectDB();
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Failed to :", error);
  }
  // DB에서 user 조회
  // user 존재
  const database = getDB();
  const userinfos = database.collection("userinfos");

  const userInfo = await userinfos.findOne({ id: userId })
  // pw hash 가져올 것
  const hash = userInfo.pw;
  // user 미존재
  

  // password 조회
  // userPw 저장된 hash 비교
  const isSamePw = await bcrypt.compare(userPw, hash);

  if (isSamePw) {
     // userId 와 같이 jwt 생성
    const token = jwt.sign({ id: userId }, privateKey, { algorithm: 'RS256' });
    const result = { status: 'success', token: token, username: userId, info: userInfo };
  
    console.log("result: ", result);
    return result;
  }
  else {
    // password 불일치
    return { status: 'fail', username: userId};
  }
};

module.exports = { signUpUser, signInUser };