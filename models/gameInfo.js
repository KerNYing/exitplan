const crypto = require("crypto");

function generateHashGameId(ownerId) {
    const data = `${ownerId}-${Date.now()}`;
    return crypto.createHash('sha256').update(data).digest('hex').substring(0, 10);
}

class GameInfo {
    constructor(gameName, roomName, ownerId, isHiddenRoom, hiddenRoomPw, gameMode) {
        this._gameName = gameName;
        this._roomName = roomName;
        this._ownerId = ownerId;
        this._isHiddenRoom = isHiddenRoom;
        this._hiddenRoomPw = hiddenRoomPw;
        this._gameMode = gameMode;
    
        this._gameId = generateHashGameId(ownerId);
        this._userIds = [];
        this._viewerIds = [];
        this._score = [0, 0];
        this._playerNum = 1;
        this._viewerNum = 0;
        this._playTime = 0;
        this._playTimeAt = Date.now();
    }

    toJSON() {
        return {gameName: this._gameName, 
            roomName: this._roomName, 
            ownerId: this._ownerId, 
            isHiddenRoom: this._isHiddenRoom, 
            hiddenRoomPw: this._hiddenRoomPw, 
            gameMode: this._gameMode,
            gameId: this._gameId, 
            userIds: this._userIds,
            viewerIds: this._viewerIds,
            score: this._score,
            playerNum: this._playerNum, 
            viewerNum: this._viewerNum, 
            playTime: this._playTime, 
            playTimeAt: this._playTimeAt
        };
    }
}

module.exports = GameInfo;