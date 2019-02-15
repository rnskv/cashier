const redisAdapter = require('socket.io-redis');
const config = require('../config.js');

const userHandlers = require('../handlers/user');

module.exports = function(io) {
    io.adapter(redisAdapter({ host: config.redis.host, port: config.redis.port }));

    io.on('connection', (socket) => {
        console.log('test server work');
        socket.on('user.login', userHandlers.login(socket))
    })
};