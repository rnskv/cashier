const mongoose = require('mongoose');

const IUser = new mongoose.Schema({
    id: Number,
    uid: Number,
    login: String,
    password: String,
    name: String,
    token: String,
    refreshToken: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
});

const User = mongoose.model('User', IUser);

module.exports = User;