const jwt = require('jsonwebtoken');

const redisAdapter = require('socket.io-redis');
const config = require('../config.js');

const userHandlers = require('../handlers/UserHandlers');

const rolesMiddleware = require('./roles');
const ErrorsHandlers = require('../handlers/ErrorsHandlers');

const IdUserStore = require('../store/IdUser');

const Handler = require('../Essenses/Handler');

const Managers = require('../managers');
const HttpManager = Managers.HttpManager;

const userHandler = new Handler();
userHandler.setMethods(userHandlers);

const checkAccess = async (data) => {
    if (!data.accessLvl) return true;

    let user = null;
    const decodedToken = jwt.decode(data.token, 'supersecretlolitsjoke');
    if (decodedToken) {
        user = IdUserStore.get(decodedToken.id);
        if (!user) {
            user = await HttpManager.request({
                method: 'POST',
                url: `${config.server.protocol}://${config.server.host}:${config.server.port}/api/v1/user/profile`,
                body: {
                    token: data.token
                }
            });
        }
    }

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


        socket.on('user.login', userHandler.execute('login'));
        socket.on('user.logout', userHandler.execute('logout'));

        socket.on('rooms.get', userHandler.execute('getRooms'));

        socket.on('room.add', userHandler.execute('addRoom', {accessLvl: 2}));
        socket.on('room.remove', userHandler.execute('removeRoom'));
        socket.on('room.join', userHandler.execute('joinRoom'));
        socket.on('room.leave', userHandler.execute('leaveRoom'));

        socket.on('disconnect', userHandler.execute('disconnect'));

    })
};