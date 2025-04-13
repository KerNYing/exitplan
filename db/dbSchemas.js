const mongoose = require("mongoose");
const { Schema } = mongoose;

// user information schema
const userInfoSchema = new Schema({
  id: { type: String, required: true },
  pw: { type: String, required: true },
  email: { type: String, required: true },
  nickname: { type: String, required: true },
  createdAt: { type: Date, required: true },
  rank: { type: String, default: "" },
  // user win / lose / draw count
  record: { type: [Number], default: [0, 0, 0] },
  // 3 types for login
  // local or google or kakao
  provider: { type: [String], required: true },
  providerId: { type: String, default: "" },
  country: { type: String, default: "KR"},
  point: { type: Number, default: 0}
});

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

// login information schema
const loginInfoSchema = new Schema({
  // jwt 관련 정보
});

const LoginInfo = mongoose.model("LoginInfo", loginInfoSchema);

// game information schema
const gameInfoSchema = new Schema({
  gameId: { type: String, required: true },
  gameName: { type: String , required: true },
  roomName: { type: String, required: true },
  ownerId: { type: String, require: true },
  isHiddenRoom: { type: Boolean, required: true, default: false},
  hiddenRoomPw: { type: String },
  gameMode: { type: String },
  userIds: { type: [String], required: true },
  viewerIds: { type: [String] },
  score: { type: [Number], default: [0, 0] },
  playerNum: { type: Number, required: true },
  viewerNum: { type: Number, required: true },
  playTime: { type: Number, default: 0 },
  playTimeAt: { type: Date, required: true },
  createdAt: { type: Date }
});

const GameInfo = mongoose.model("GameInfo", gameInfoSchema);

// QueueInfo was merged with GameInfo schema
// 
// // queue information schema
// const queueInfoSchema = new Schema({
//   gameId: { type: String, required: true },
//   gameName: { type: String , required: true },
//   roomName: { type: String, require: true },
//   ownerId: { type: String, require: true },
//   isHiddenRoom: { type: Boolean, required: true, default: false},
//   playerNum: { type: Number, required: true },
//   viewerNum: { type: Number, required: true }
// });

// const QueueInfo = mongoose.model("QueueInfo", queueInfoSchema);

// chat log information schema
const chatInfoSchema = new Schema({
  gameId: { type: String, required: true },
  chatTimeAt: { type: Date, required: true },
  userId: { type: String, required: true },
  chatLog: { type: String, required: true }
});

const ChatInfo = mongoose.model("ChatInfo", chatInfoSchema);

// Export all models using module.exports
module.exports = {
  UserInfo,
  LoginInfo,
  GameInfo,
  // QueueInfo,
  ChatInfo
};