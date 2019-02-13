const express = require('express');
const mongoose = require('mongoose');
const app = express();

const useMainMiddlewares = require('./middlewares/main');

const config = require('./config');

const User = require('./models/User');

mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@ds131765.mlab.com:31765/cashier`, {useNewUrlParser: true});

const player = new User({
    name: 'Roman',
    uid: 666,
    login: 'rnskv',
    password: 'qwerty',
    token: 'token123qwer',
    refreshToken: 'token123qwertyrefresh'
});

player.save().then(() => console.log('Player save'));

useMainMiddlewares(app);

app.listen(config.server.port, function () {
    console.log(config.server.startMessage);
});