const jwt = require('jsonwebtoken');
const request = require('request');

const Managers = require('../managers');
const HttpManager = Managers.HttpManager;
const UsersManager = Managers.UsersManager;
const RoomsManager = Managers.RoomsManager;
const ErrorsManager = Managers.ErrorsManager;
const GlobalManager = Managers.GlobalManager;
const SocketsManager = Managers.SocketsManager;

const UserStore = require('../store/Users');
const UsersStore = require('../store/Users');
const SocketUserStore = require('../store/SocketUser');

const UserSelector = require('../selectors/UserSelectors');

const User = require('../Essenses/User');

const RnskvError = require('../Essenses/RnskvError');

module.exports = {
    startGame: (socket) => (data) => {
        const room = RoomsManager.getRoom(data.roomId);
        const game = RoomsManager.startGame(data.roomId);

        game.setUserStepTimer({
            name: 'userStep',
            time: 5000,
            stepCb: game.stepCb((time) => SocketsManager.emitGameRoom(socket, room.id, 'game.time', { time } )),
            finishCb: game.finishCb((time) => SocketsManager.emitGameRoom(socket, room.id, 'game.update.state', { game })),
        });

        SocketsManager.emitGameRoom(socket, room.id, 'game.start', { roomId: data.roomId });
    },
    connectGame: (socket) => (data) => {
        SocketsManager.emitUser(socket, 'game.connect', { roomId: data.roomId });
    },
    getState: (socket) => (data) => {
        if (!data.user.roomId) {
            throw new RnskvError({
                type: 'default',
                code: 0,
                message: `Вы не находитесь в комнате.`
            })
        }

        if (data.user.roomId && Number(data.user.roomId) !== Number(data.roomId)) {
            throw new RnskvError({
                type: 'default',
                code: 0,
                message: `Вы находитесь в другой комнате.`
            })
        }

        const game = RoomsManager.getRoomGame(data.roomId);
        const room = RoomsManager.getRoom(data.roomId);

        console.log('getState', room);

        SocketsManager.emitUser(socket, 'game.state', { game, room })
    },
    nextStep: (socket) => (data) => {
        const roomId = UsersStore.get(socket.userId).roomId;
        const game = RoomsManager.getRoomGame(roomId);
        game.nextStep();
        SocketsManager.emitUser(socket, 'game.update.state', { game })
    },
    getTime: (socket) => (data) => {
        const { timerName } = data;
        const game = RoomsManager.getRoomGame(roomId);

        SocketsManager.emitUser(socket, 'game.time', { time: game.Ticker.getTime({ name: timerName }) })
    }
};