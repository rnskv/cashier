const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
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

app.use(require('cookie-parser')());
app.use(require('express-session')({secret:'keyboard cat', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', router);

app.listen(config.server.port, function () {
    console.log(config.server.startMessage);
});