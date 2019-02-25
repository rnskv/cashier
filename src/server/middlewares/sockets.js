const jwt = require('jsonwebtoken');

const redisAdapter = require('socket.io-redis');
const config = require('../config.js');

const userHandlers = require('../handlers/UserHandlers');

const rolesMiddleware = require('./roles');
const ErrorsHandlers = require('../handlers/ErrorsHandlers');

const IdUserStore = require('../store/IdUser');

const Handler = require('../Essenses/Handler');
const testHandler = new Handler();

testHandler.setMethods({
    test: (socket) => (data) => {
        console.log('Тестовое дейсвие')
    }
});

const mw1 = (data) => {
    console.log('test middleware 1', data);
    return true;
};

const mw2 = (data) => {
    console.log('test middleware 2', data);
    let user = null;
    const decodedToken = jwt.decode(data.token, 'supersecretlolitsjoke');
    console.log('decoded token', decodedToken);
    if (decodedToken) {
        user = IdUserStore.get(decodedToken.id);

        console.log('get USer', user);
        if (!user) {
            //get from database by request;
        }
    }
    console.log('accessLvl', user.accessLvl, data.accessLvl);
    if (user.accessLvl >= data.accessLvl) {
        console.log('access get');
        return true;
    }
    return false;
};

module.exports = (io) => (app) => {
    console.log('testion:', testHandler.handlers.test);


    io.adapter(redisAdapter({ host: config.redis.host, port: config.redis.port }));

    io.on('connection', (socket) => {
        testHandler.setSocket(socket);

        testHandler.addMiddleware(mw1);
        testHandler.addMiddleware(mw2);

        const rm = rolesMiddleware.bind(null, socket);

        app.use((req, res) => {
            res.socket = socket;
        });

        socket.on('user.login', userHandlers.login(socket));
        socket.on('user.logout', userHandlers.logout(socket));

        socket.on('rooms.get', userHandlers.getRooms(socket));

        socket.on('room.add', userHandlers.addRoom(socket));
        socket.on('room.remove', userHandlers.removeRoom(socket));
        socket.on('room.join', userHandlers.joinRoom(socket));
        socket.on('room.leave', userHandlers.leaveRoom(socket));
        // socket.on('room.leave', userHandlers.leaveRoom(socket));

        socket.on('test', testHandler.execute('test', {accessLvl: 0}));

        socket.on('disconnect', userHandlers.disconnect(socket));
    })
};