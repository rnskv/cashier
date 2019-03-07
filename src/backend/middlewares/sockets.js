const jwt = require('jsonwebtoken');

const redisAdapter = require('socket.io-redis');

const userHandlers = require('../handlers/UserHandlers');
const gameHandlers = require('../handlers/GameHandlers');
const roomHandlers = require('../handlers/RoomHandlers');
const rolesMiddleware = require('./roles');
const ErrorsHandlers = require('../handlers/ErrorsHandlers');

const UsersStore = require('../store/Users');

const Handler = require('../Essenses/Handler');

const Managers = require('../managers');
const HttpManager = Managers.HttpManager;

const userHandler = new Handler();
const gameHandler = new Handler();
const roomHandler = new Handler();

userHandler.setMethods(userHandlers);
gameHandler.setMethods(gameHandlers);
roomHandler.setMethods(roomHandlers);

const checkAccess = async (data) => {
    if (!data.accessLvl) return true;

    let user = null;
    console.log('checkAcess', data.debugName);

    const decodedToken = jwt.decode(data.token, process.env.JWT_SECRET);
    if (decodedToken) {
        user = UsersStore.get(decodedToken.id);
        if (!user) {
            user = await HttpManager.request({
                method: 'POST',
                url: `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/v1/user`,
                body: {
                    id: decodedToken.id
                }
            });
        }
    }

    return user && user.accessLvl >= data.accessLvl ? data : false;
};

const socketToReq = (socket) => (req, res) => {
    res.socket = socket;
};

const setUser = async (data) => {
    const decodedToken = jwt.decode(data.token, process.env.JW);
    console.log('setUser', decodedToken);
    if (decodedToken) {
        data.user = UsersStore.get(decodedToken.id);
    }

    return data;
};

module.exports = (io) => (app) => {
    io.adapter(redisAdapter({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }));

    io.on('connection', (socket) => {
        app.use(socketToReq(socket));

        userHandler.setSocket(socket);
        roomHandler.setSocket(socket);
        gameHandler.setSocket(socket);

        userHandler.addMiddlewares([checkAccess, setUser]);
        roomHandler.addMiddlewares([checkAccess, setUser]);
        gameHandler.addMiddlewares([checkAccess, setUser]);

        socket.on('user.login', userHandler.execute('login'), { debugName: 'login' });
        socket.on('user.logout', userHandler.execute('logout'));
        socket.on('user.profile', userHandler.execute('profile', { debugName: 'profile', accessLvl: 1 }));

        socket.on('room.add', roomHandler.execute('addRoom', { accessLvl: 1 }));
        socket.on('room.remove', roomHandler.execute('removeRoom', { accessLvl: 1 }));
        socket.on('room.join', roomHandler.execute('joinRoom', { accessLvl: 1 }));
        socket.on('room.leave', roomHandler.execute('leaveRoom', { accessLvl: 1 }));
        socket.on('rooms.get', roomHandler.execute('getRooms'));

        socket.on('game.start', gameHandler.execute('startGame', { accessLvl: 1 }));
        socket.on('game.connect', gameHandler.execute('connectGame', { accessLvl: 1 }));
        socket.on('game.state', gameHandler.execute('getState', { accessLvl: 1 }));
        socket.on('game.nextStep', gameHandler.execute('nextStep', { accessLvl: 1 }));


        socket.on('disconnect', userHandler.execute('disconnect'));

    })
};