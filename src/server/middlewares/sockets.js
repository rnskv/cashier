const redisAdapter = require('socket.io-redis');
const config = require('../config.js');

const userHandlers = require('../handlers/UserHandlers');

module.exports = (io) => (app) => {

    io.adapter(redisAdapter({ host: config.redis.host, port: config.redis.port }));

    io.on('connection', (socket) => {

        app.use((req, res) => {
            res.socket = socket;
        });

        socket.on('user.login', userHandlers.login(socket));
        socket.on('user.logout', userHandlers.logout(socket));

        // socket.on('room.add', userHandlers.addRoom(socket));
        // socket.on('room.remove', userHandlers.removeRoom(socket));
        // socket.on('room.join', userHandlers.joinRoom(socket));
        // socket.on('room.leave', userHandlers.joinRoom(socket));
        // socket.on('room.leave', userHandlers.leaveRoom(socket));


        socket.on('disconnect', userHandlers.disconnect(socket));
    })
};