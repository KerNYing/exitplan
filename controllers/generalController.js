const path = require('path');
const { isUserIdRegistered } = require('../services/userService');

exports.home = (req, res) => {
    res.sendFile(path.join(__dirname, '..', './public/main.html'));
    console.log("main입니다!");
};

exports.game = (req, res) => {
    res.sendFile(path.join(__dirname, '..', './public/game.html'));
};

exports.signup = (req, res) => {
    res.sendFile(path.join(__dirname, '..', './public/signup.html'));
}

exports.queue = (req, res) => {
    res.sendFile(path.join(__dirname, '..', './public/queue.html'));
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