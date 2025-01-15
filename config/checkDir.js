const fs = require('fs');
const path = require('path');

// 폴더 존재 여부 확인 및 생성
const checkAndMakeEnvDir = function () {
    const envDirPath = path.join('__dirname','..','env');
    fs.access(envDirPath, (error) => {
        if (error) {
            // 폴더가 없으면 생성
            fs.mkdir(envDirPath, { recursive: true }, (err) => {
                if (err) {
                    console.error(`폴더 생성 실패: ${err.message}`);
                } else {
                    console.log(`폴더가 생성되었습니다: ${envDirPath}`);
                }
            });
        } else {
            console.log(`폴더가 이미 존재합니다: ${envDirPath}`);
        }
    });
}
module.exports = { checkAndMakeEnvDir };