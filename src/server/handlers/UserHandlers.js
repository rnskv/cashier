const jwt = require('jsonwebtoken');

const Managers = require('../managers');
const GlobalManager = Managers.GlobalManager;
const RoomsManager = Managers.RoomsManager;
const HttpManager = Managers.HttpManager;
const UsersManager = Managers.UsersManager;
const ErrorsManager = Managers.ErrorsManager;
const SocketsManager = Managers.SocketsManager;

const UserRoomStore = require('../store/UserRoom');

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

        const user = new User(response, response.token);

        socket.userId = user.profile._id;

        GlobalManager.addUser(socket.id, user);
        socket.join(`user_${socket.userId}`);

        SocketsManager.emitUser(socket, 'user.login', { profile: response, token: response.token });
        SocketsManager.emitAll(socket, 'lobby.connect', { users: GlobalManager.getUsers() });
    },
    logout: (socket) => () => {
        GlobalManager.removeUser(socket.id);

        SocketsManager.emitUser(socket, 'user.logout', { users: []});
        SocketsManager.emitAll(socket, 'lobby.disconnect', { users: GlobalManager.getUsers() });
    },
    disconnect: (socket) => () => {
        GlobalManager.removeUser(socket.id);
        SocketsManager.emitAll(socket, 'lobby.disconnect', { users: GlobalManager.getUsers() });
    },
    addRoom: (socket) => async (data) => {
        const { token } = data;
        console.log(token);
        const payload = jwt.decode(token, 'supersecretlolitsjoke');
        console.log('payload', payload);
        const userRoomId = UserRoomStore.get(socket.userId);
        if (userRoomId) {
            socket.server.to(`user_${socket.userId}`).emit('global.error', { message: 'Вы уже в комнате', type: 'error', code: 4 });
            return
        }
        const roomId = RoomsManager.addRoom({_id: socket.userId });
        await UsersManager.joinRoom(roomId, socket.userId);

        SocketsManager.emitUser(socket, 'user.roomId', { roomId });
        SocketsManager.emitAll(socket, 'room.add', { room: RoomsManager.getRoom(roomId) });

    },
    removeRoom: (socket) => (data) => {
        const { token, id } = data;
        //Потом проверка прав пользователя будет тут;

        RoomsManager.removeRoom(id);
        SocketsManager.emitAll(socket, 'room.remove', { roomId: id });

    },
    getRooms: (socket) => (data) => {
        console.log(socket.userId);

        SocketsManager.emitUser(socket, 'user.roomId', {roomId: UserRoomStore.get(socket.userId)});
        SocketsManager.emitAll(socket, 'rooms.get', { rooms: RoomsManager.getRooms() });
    },
    joinRoom: (socket) => async (data) => {
        const { roomId } = data;
        const userRoomId = UserRoomStore.get(socket.userId);

        if (roomId === userRoomId) {
            socket.to(`user_${socket.userId}`).emit('global.error', { message: 'Уже в комнате', type: 'error', code: 2 });
            return;
        }
        if (userRoomId) {
            UsersManager.leaveRoom(userRoomId, socket.userId);
            SocketsManager.emitAll(socket, 'room.leave', { roomId: userRoomId, userId: socket.userId });
        }

        let user = await UsersManager.joinRoom(roomId, socket.userId);

        SocketsManager.emitUser(socket, 'user.roomId', { roomId });
        SocketsManager.emitAll(socket, 'room.join', { roomId, user });

    },
    leaveRoom: (socket) => (data) => {
        const { roomId } = data;
        const userRoomId = UserRoomStore.get(socket.userId);
        if (userRoomId !== roomId) {
            socket.server.to(`user_${socket.userId}`).emit('global.error', { message: 'Вы не в этой комнате', type: 'error', code: 3 });
            return;
        }
        console.log(`Leave ${socket.userId} from ${roomId}`);
        UsersManager.leaveRoom(roomId, socket.userId);

        SocketsManager.emitUser(socket, 'user.roomId', { roomId: null });
        SocketsManager.emitAll(socket, 'room.leave', { roomId, userId: socket.userId });

    },
    leaveLobby: function() {

    }
};