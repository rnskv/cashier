const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

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
IUser.plugin(findOrCreate);

const User = mongoose.model('User', IUser);

module.exports = User;