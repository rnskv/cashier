const Managers = require('../managers');
const GlobalManager = Managers.GlobalManager;
const RoomsManager = Managers.RoomsManager;
const HttpManager = Managers.HttpManager;
const UsersManager = Managers.UsersManager;
const ErrorsManager = Managers.ErrorsManager;

const User = require('../Essenses/User');

const request = require('request');

module.exports = {
    login: (socket) => async (data) => {
        //отправляем запрос на сервер с data.password and data.login;
        const response = await HttpManager.request({
            method: 'POST',
            url: 'http://localhost:1337' + '/api/v1/user/profile',
            body: {
                token: data.token
            }
        });

        if (!response) {
            socket.emit('global.error', { message: 'Ошибка авторизации', type: 1 });
            return;
        }

        const user = new User(response, response.accessToken);

        socket.userId = user.profile._id;

        GlobalManager.addUser(socket.id, user);
        socket.emit('user.login', { profile: response, token: response.accessToken });
        socket.server.emit('lobby.connect', { users: GlobalManager.getUsers() });
    },
    logout: (socket) => () => {
        GlobalManager.removeUser(socket.id);
        socket.emit('user.logout', { users: []});
        socket.server.emit('lobby.disconnect', { users: GlobalManager.getUsers() });
    },
    disconnect: (socket) => () => {
        GlobalManager.removeUser(socket.id);
        socket.server.emit('lobby.disconnect', { users: GlobalManager.getUsers() });
    },
    addRoom: (socket) => (data) => {
        const { token } = data;
        const roomId = RoomsManager.addRoom({_id: socket.userId });

        socket.server.emit('room.add', { room: RoomsManager.getRoom(roomId) });
    },
    removeRoom: (socket) => (data) => {
        const { token, id } = data;
        //Потом проверка прав пользователя будет тут;

        RoomsManager.removeRoom(id);
        console.log('Remove', id);
        socket.server.emit('room.remove', { roomId: id });
    },
    getRooms: (socket) => (data) => {
        socket.server.emit('rooms.get', { rooms: RoomsManager.getRooms() });
    },
    joinRoom: (socket) => async (data) => {
        const { roomId } = data;
        const userRoomId = UsersManager.getUserRoomId(socket.userId);
        console.log('userRoomId', userRoomId);
        if (userRoomId) {
            UsersManager.leaveRoom(userRoomId, socket.userId);
            socket.server.emit('room.leave', {roomId: userRoomId, userId: socket.userId});
        }
        console.log(`user - ${socket.userId } join to room ${roomId}`);
        let user = await UsersManager.joinRoom(roomId, socket.userId);
        if (user.type === 'error') {
            socket.emit('global.error', user);
            return;
        }

        socket.server.emit('room.join', {roomId, user})
    },
    leaveRoom: (socket) => (data) => {
        const { roomId } = data;
        console.log(`user - ${socket.userId } leave from room ${roomId}`);
        UsersManager.leaveRoom(roomId, socket.userId);
        socket.server.emit('room.leave', {roomId, userId: socket.userId})
    },
    leaveLobby: function() {

    }
};