import mongoose from "mongoose";
const { Schema } = mongoose;

// user infomation schema
const userInfoSchema = new Schema({
  id: { type: String, required: true },
  pw: { type: String, required: true },
  email: { type: String, required: true },
  nickname: { type: String, required: true},
  createdAt: { type: Date, required: true},
  rank: { type: String, default: ""},
  // user win / lose / draw count
  record: { type: [Number], default: [0, 0, 0]},
  // 3 types for login
  // local or google or kakao
  provider: { type: [String], required: true},
  providerId: { type: String, default: ""}
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

// login information schema
const loginInfoSchema = new Schema({
// jwt 관련 정보
});

const LoginInfo = mongoose.model('LoginInfo', loginInfoSchema);

// game infomation schema
const gameInfoSchema = new Schema({
  gameId: { type: String, required: true},
  userIds: { type: [String], required: true},
  score: { type: [Number], default: [0, 0]},
  playTime: { type: Number, default: 0},
  playTimeAt: { type: Date, required: true}
});

const GameInfo = mongoose.model('GameInfo', gameInfoSchema);

// queue infomation schema
const queueInfoSchema = new Schema({
  gameId: { type: String }
});

const QueueInfo = mongoose.model('QueueInfo', queueInfoSchema);

// chat log information schema
const chatInfoSchema = new Schema({
  gameId: { type: String, required: true },
  chatTimeAt: { type: Date, required: true},
  userId: { type: String, required: true},
  chatLog: { type: String, required: true}
});

const ChatInfo = mongoose.model('ChatInfo', chatInfoSchema);

export default { UserInfo, LoginInfo, GameInfo, QueueInfo };
