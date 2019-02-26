const jwt = require('jsonwebtoken');

const redisAdapter = require('socket.io-redis');
const config = require('../config.js');

const userHandlers = require('../handlers/UserHandlers');
const gameHandlers = require('../handlers/GameHandlers');

const rolesMiddleware = require('./roles');
const ErrorsHandlers = require('../handlers/ErrorsHandlers');

const UsersStore = require('../store/Users');

const Handler = require('../Essenses/Handler');

const Managers = require('../managers');
const HttpManager = Managers.HttpManager;

const userHandler = new Handler();
const gameHandler = new Handler();

userHandler.setMethods(userHandlers);
gameHandler.setMethods(gameHandlers);

const checkAccess = async (data) => {
    if (!data.accessLvl) return true;

    let user = null;
    const decodedToken = jwt.decode(data.token, config.jwt.secret);
    if (decodedToken) {
        user = UsersStore.get(decodedToken.id);
        if (!user) {
            user = await HttpManager.request({
                method: 'POST',
                url: `${config.server.protocol}://${config.server.host}:${config.server.port}/api/v1/user`,
                body: {
                    id: decodedToken.id
                }
            });
        }
    }
    if (!user) return false;
    return user.accessLvl >= data.accessLvl;
};

const socketToReq = (socket) => (req, res) => {
    res.socket = socket;
};

module.exports = (io) => (app) => {
    io.adapter(redisAdapter({ host: config.redis.host, port: config.redis.port }));

    io.on('connection', (socket) => {
        app.use(socketToReq(socket));

        userHandler.setSocket(socket);
        userHandler.addMiddleware(checkAccess);

        gameHandler.setSocket(socket);
        gameHandler.addMiddleware(checkAccess);

        socket.on('user.login', userHandler.execute('login'));
        socket.on('user.logout', userHandler.execute('logout'));

        socket.on('user.profile', userHandler.execute('profile'));

        socket.on('rooms.get', userHandler.execute('getRooms'));

        socket.on('room.add', userHandler.execute('addRoom', { accessLvl: 1 }));
        socket.on('room.remove', userHandler.execute('removeRoom', { accessLvl: 1 }));
        socket.on('room.join', userHandler.execute('joinRoom', { accessLvl: 1 }));
        socket.on('room.leave', userHandler.execute('leaveRoom', { accessLvl: 1 }));

        socket.on('game.start', gameHandler.execute('startGame', { accessLvl: 1 }));
        socket.on('game.state', gameHandler.execute('getState', { accessLvl: 1 }));
        socket.on('game.nextStep', gameHandler.execute('nextStep', { accessLvl: 1 }));


        socket.on('disconnect', userHandler.execute('disconnect'));

    })
};