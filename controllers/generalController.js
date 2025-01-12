const path = require('path');

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