const express = require('express');
const http = require('http');
const redis = require('redis');

const client = redis.createClient();

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);


const useMainMiddlewares = require('./middlewares/main');
const useSocketMiddlewares = require('./middlewares/sockets');

const config = require('./config');

const User = require('./models/User');


//
// redisManager.set('user', 2);
//
// redisManager.sadd('users', [1, 2, 3, 4, 5]);

//
// (async () => {
//     let test1 = await redisManager.get('user');
//     let test2 = await redisManager.smembers('users');
//
//     // redisManager.srem('test2', alalalaa);
//
//     test2 = await redisManager.smembers('usersss');
//
//     console.log('mmmm', test1);
//     console.log('mmmssssm', test2);
//
// })();


const player = new User({
    name: 'Roman',
    uid: 666,
    login: 'rnskv',
    password: 'qwerty',
    token: 'token123qwer',
    refreshToken: 'token123qwertyrefresh'
});

// player.save().then(() => console.log('Player save'));

useMainMiddlewares(app);
useSocketMiddlewares(io)(app);

server.listen(config.server.port, function () {
    console.log(config.server.startMessage);
});