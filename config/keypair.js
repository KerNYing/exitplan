const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// 키 파일 경로
const privateKeyPath = path.join(__dirname,'..','/env/private.key');
const publicKeyPath = path.join(__dirname,'..','/env/public.key');

// 키 파일 존재 여부 확인 및 생성
if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
    generateKeyPair();
} else {
    console.log("Key pair already exists.");
}

// 키 생성 함수
function generateKeyPair() {
    console.log("Generating key pair...");
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048, // 키 길이
        publicKeyEncoding: {
            type: 'spki', // 표준 공개 키 형식
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8', // 표준 개인 키 형식
            format: 'pem',
        },
    });

    // 키 파일 저장
    fs.writeFileSync(privateKeyPath, privateKey);
    fs.writeFileSync(publicKeyPath, publicKey);
    console.log("Key pair generated and saved.");
}

