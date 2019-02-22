const jwt = require('jsonwebtoken');

const Managers = require('../managers');
const GlobalManager = Managers.GlobalManager;
const RoomsManager = Managers.RoomsManager;
const HttpManager = Managers.HttpManager;
const UsersManager = Managers.UsersManager;
const ErrorsManager = Managers.ErrorsManager;
const SocketsManager = Managers.SocketsManager;

const UserRoomStore = require('../store/UserRoom');
const SocketUserStore = require('../store/SocketUser');

const UserSelector = require('../selectors/UserSelectors');

const User = require('../Essenses/User');

const request = require('request');
const config = require('../config');

module.exports = {
    accessDenied: (socket) => (data) => {
        console.log('accessDenied');
        SocketsManager.emitUser(socket, 'global.error', { message: 'Нет доступа', type: 'error', code: 4 });
    }
};