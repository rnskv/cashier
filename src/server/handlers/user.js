const GlobalManager = require('../managers/global');
const UserManager = require('../managers/user');
const HttpManager = require('../managers/http');

const request = require('request');

module.exports = {
    login: (socket) => async (data) => {
        //отправляем запрос на сервер с data.password and data.login;
        console.log('user.login', data);

        const response = await HttpManager.request({
            method: 'POST',
            url: 'http://localhost:1337' + '/api/v1/user/profile',
            body: {
                token: data.token
            }
        });

        console.log(response);

        const user = new UserManager({}, data.token);

        GlobalManager.addUser(socket.id, user);

        socket.emit('user.login', { profile: {}, token: data.token });
        socket.server.emit('user.disconnect', { users: GlobalManager.getUsers() });
    },
    logout: (socket) => () => {
        GlobalManager.removeUser(socket.id);
        socket.emit('user.logout', { users: []});
        socket.server.emit('user.disconnect', { users: GlobalManager.getUsers() });
    },
    disconnect: (socket) => () => {
        GlobalManager.removeUser(socket.id);
        socket.server.emit('user.disconnect', { users: GlobalManager.getUsers() });
    },
    joinLobby: function() {

    },
    leaveLobby: function() {

    },
    leaveRoom: function() {

    },
    joinRoom: function() {

    }
};