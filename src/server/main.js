const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

const router = require('./router');
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

app.use(bodyParser.json());
app.use('/api/v1', router);

app.listen(1337, function () {
    console.log('Example app listening on port 3000!');
});