const redisAdapter = require('socket.io-redis');
const config = require('../config.js');

const userHandlers = require('../handlers/UserHandlers');

const rolesMiddleware = require('./roles');

module.exports = (io) => (app) => {

    io.adapter(redisAdapter({ host: config.redis.host, port: config.redis.port }));

    io.on('connection', (socket) => {
        const rm = rolesMiddleware.bind(null, socket);

        app.use((req, res) => {
            res.socket = socket;
        });

        socket.on('user.login', rm(userHandlers.login, 1));
        socket.on('user.logout', rm(userHandlers.logout));

        socket.on('rooms.get', rm(userHandlers.getRooms));

        socket.on('room.add', rm(userHandlers.addRoom));
        socket.on('room.remove', rm(userHandlers.removeRoom));
        socket.on('room.join', rm(userHandlers.joinRoom));
        socket.on('room.leave', rm(userHandlers.leaveRoom));
        // socket.on('room.leave', userHandlers.leaveRoom(socket));


        socket.on('disconnect', userHandlers.disconnect(socket));
    })
};