# 베이스 이미지로 Node.js 사용
FROM node:20

# 애플리케이션 코드가 위치할 디렉토리 생성
WORKDIR /usr/src/app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 애플리케이션이 실행될 포트
EXPOSE 3000

# 애플리케이션 실행 명령어
CMD ["npm", "start"]