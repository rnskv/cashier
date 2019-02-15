const GlobalManager = require('../managers/global');
const UserManager = require('../managers/user');

module.exports = {
    login: (socket) => (data) => {
        //отправляем запрос на сервер с data.password and data.login;
        console.log('user.login');

        const mock = {
            profile: {
                login: 'rnskv',
                avatar: 'https://avatars0.githubusercontent.com/u/20299144?s=460&v=4'
            },
            token: 'tokensecretveryhardread'
        };

        const user = new UserManager(mock.profile, mock.token);

        GlobalManager.addUser(socket.id, user);

        socket.emit('user.login', { profile: mock.profile, token: mock.token });
        socket.server.emit('user.disconnect', { users: GlobalManager.getUsers() });
    },
    logout: (socket) => (data) => {
        GlobalManager.removeUser(socket.id);
        socket.emit('user.logout', { users: []});
        socket.server.emit('user.logout', { users: GlobalManager.getUsers() });
    },
    joinLobby: function() {

    },
    leaveLobby: function() {

    },
    leaveRoom: function() {

    },
    joinRoom: function() {

    },
    disconnect: (socket) => () => {
        GlobalManager.removeUser(socket.id);
        socket.server.emit('user.disconnect', { users: GlobalManager.getUsers() });
    }
};