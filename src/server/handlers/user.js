const GlobalManager = require('../managers/global');
const UserManager = require('../managers/user');

module.exports = {
    login: function(socket, data) {
        const user = new UserManager(data.profile, data.token);
        GlobalManager.addUser(socket.id, user)
    },
    logout: function() {

    },
    joinLobby: function() {

    },
    leaveLobby: function() {

    },
    leaveRoom: function() {

    },
    joinRoom: function() {

    },
};