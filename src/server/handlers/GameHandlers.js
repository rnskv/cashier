const jwt = require('jsonwebtoken');

const Managers = require('../managers');
const GlobalManager = Managers.GlobalManager;
const RoomsManager = Managers.RoomsManager;
const HttpManager = Managers.HttpManager;
const UsersManager = Managers.UsersManager;
const ErrorsManager = Managers.ErrorsManager;
const SocketsManager = Managers.SocketsManager;

const UserStore = require('../store/Users');
const SocketUserStore = require('../store/SocketUser');
const UsersStore = require('../store/Users');

const UserSelector = require('../selectors/UserSelectors');

const User = require('../Essenses/User');

const request = require('request');
const config = require('../config');

const RnskvError = require('../Essenses/RnskvError');

module.exports = {
    userTimerFinishCallbak: (socket) => (data) => {

    },

    userTimerStepCallbak: (socket) => (data) => {

    },

    setUserTimer: (socket) => (data) => {

    },
    startGame: (socket) => (data) => {
        console.log('Start game');
        const room = RoomsManager.getRoom(data.roomId);
        const game = RoomsManager.startGame(data.roomId);

        game.setUserStepTimer({
            name: 'userStep',
            time: 15000,
            stepCb: game.stepCb((time) => SocketsManager.emitAll(socket, 'game.time', { time } )),
            finishCb: game.stepCb((time) => SocketsManager.emitAll(socket, 'game.time', { time } )),
        });

        console.log('_____', this);

       //Отсю.да выкидываю коллбек с емитом в таймер. Профит.


        room.participants.forEach(participant => {
            SocketsManager.emitOtherUser(socket, participant.id, 'game.start', { roomId: data.roomId });
        });
    },
    getState: (socket) => (data) => {
        const game = RoomsManager.getRoomGame(data.roomId);
        const room = RoomsManager.getRoom(data.roomId);
        SocketsManager.emitUser(socket, 'game.state', { game, room })
    },
    nextStep: (socket) => (data) => {
        console.log('nextStep');
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