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

module.exports = {
    startGame: (socket) => (data) => {
        console.log('Start game');
        RoomsManager.startGame(data.roomId);

        const room = RoomsManager.getRoom(data.roomId);

        room.participants.forEach(participant => {
            SocketsManager.emitOtherUser(socket, participant.id, 'game.start', { roomId: data.roomId });
        });
    },
    getState: (socket) => (data) => {
        console.log('Game try get data');
        const game = RoomsManager.getRoomGame(data.roomId);
        const room = RoomsManager.getRoom(data.roomId);
        console.log(game);
        SocketsManager.emitUser(socket, 'game.state', { game, room })
    },
    nextStep: (socket) => (data) => {
        console.log('nextStep');
        const roomId = UsersStore.get(socket.userId).roomId;
        const game = RoomsManager.getRoomGame(roomId);
        game.nextStep();
        SocketsManager.emitUser(socket, 'game.update.state', { game })
    }
};