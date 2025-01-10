const path = require('path');

const opUserData = {
    id: 1,
    userName: 'jaeseok',
    userRank: 'Bronze',
    userRecord: 'W4 / L3 / D2'
};

exports.opUser = (req, res) => {
    res.json(opUserData);
};