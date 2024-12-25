const path = require('path');

exports.home = (req, res) => {
    res.sendFile(path.join(__dirname, '..', './public/index.html'));
    console.log("home입니다!");
};

exports.game = (req, res) => {
    res.sendFile(path.join(__dirname, '..', './public/game.html'));
};