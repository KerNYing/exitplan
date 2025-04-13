const path = require('path');
const { isUserIdRegistered } = require('../services/userService');

exports.home = (req, res) => {
    console.log("main입니다!");
    res.sendFile(path.join(__dirname, '..', './dist/index.html'));
};

exports.game = (req, res) => {
    res.sendFile(path.join(__dirname, '..', './dist/game.html'));
};

exports.signup = (req, res) => {
    res.sendFile(path.join(__dirname, '..', './dist/signup.html'));
}

exports.queue = (req, res) => {
    res.sendFile(path.join(__dirname, '..', './dist/queue.html'));
}

exports.userinfo = async (req, res) => {
    const userId = req.query.userId;
    console.log("userId: ", userId)
    if (await isUserIdRegistered(userId)) {
        console.log("true");
        res.json({ isUserIdRegistered: true });
    }
    else {
        console.log("false");
        res.json({ isUserIdRegistered: false });
    }
}

exports.loginNeeded = (req, res) => {
    res.sendFile(path.join(__dirname, '..', './dist/loginNeeded.html'));
}