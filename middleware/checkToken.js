// jwt module
const jwt = require('jsonwebtoken');
// filesystem module
const fs = require('fs');
// path module
const path = require('path');

// privatekey path
const privateKeyPath = path.join(__dirname,'..','/env/private.key');
// privatekey fs object
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

// token 유무/유효성 검증 함수 (미들웨어)
function checkToken(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        // return res.status(401).json({ message: '로그인이 필요합니다.' });
        return res.status(401).redirect("/loginNeeded");
    }

    try {
        // token 검증
        // verification 과정에서 유효한 token으로 확인되지 않는다면 error 발생
        const decoded = jwt.verify(token, privateKey);
        // req.user == decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: '토큰이 유효하지 않습니다. '});
    }
}

module.exports = checkToken;