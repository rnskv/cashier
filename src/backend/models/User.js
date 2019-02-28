const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const IUser = new mongoose.Schema({
    id: Number,
    uid: Number,
    login: {
        type: String,
        default: 'unknown'
    },
    avatar: String,
    password: String,
    name: String,
    accessToken: String,
    token: String,
    refreshToken: String,
    accessLvl: {
        type: Number,
        default: 1
    }
}, {
    timestamps: {
        createdAt: 'createAt',
        updatedAt: 'updateAt' }
});

IUser.plugin(findOrCreate);
const User = mongoose.model('User', IUser);

module.exports = User;