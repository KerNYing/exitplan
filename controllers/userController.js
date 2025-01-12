const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs')

// 키 파일 경로
const privateKeyPath = path.join(__dirname,'..','/env/private.key');
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

const { getUserInfo } = require('../services/userService');

// const opUserData = {
//     id: 1,
//     userName: 'jaeseok',
//     userRank: 'Bronze',
//     userRecord: 'W4 / L3 / D2'
// };

exports.opUser = (req, res) => {
    // cookie로부터 token (JWT) 추출
    const token = req.cookies.token;
    console.log(token);

    jwt.verify(token, privateKey, async (err, decoded) => {
        console.log(decoded.id);

        const opUserData = await getUserInfo(decoded.id);
        console.log(opUserData);
        res.json(opUserData);
    });
    // DB에서 token에 맞는 유저정보 조회    
};