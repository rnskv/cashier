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
            stepCb: game.stepCb((time) => SocketsManager.emitAll(socket, 'game.time', { time } )),
            finishCb: game.finishCb((time) => SocketsManager.emitAll(socket, 'game.update.state', { game })),
        });

        Object.values(room.participants).forEach(participant => {
            participant && SocketsManager.emitOtherUser(socket, participant.id, 'game.start', { roomId: data.roomId });
            participant && console.log('emit to', participant.id)
        });

    },
    connectGame: (socket) => (data) => {
        SocketsManager.emitUser(socket, 'game.connect', { roomId: data.roomId });
    },
    getState: (socket) => (data) => {
        const game = RoomsManager.getRoomGame(data.roomId);
        const room = RoomsManager.getRoom(data.roomId);
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