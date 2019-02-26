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
    login: (socket) => async (data) => {
        //отправляем запрос на сервер с data.password and data.login;
        const decodedToken = jwt.decode(data.token, config.jwt.secret);

        const response = await HttpManager.request({
            method: 'POST',
            url: `${config.server.protocol}://${config.server.host}:${config.server.port}/api/v1/user/`,
            body: {
                id: decodedToken.id
            }
        });

        if (!response) {
            socket.emit('global.error', { message: 'Ошибка авторизации', type: 1 });
            return;
        }

        const user = new User(response, response.token);

        UsersStore.update(decodedToken.id, UserSelector.storeData(user.profile));

        socket.userId = decodedToken.id;

        SocketUserStore.set(socket.id, UserSelector.socketData(user.profile));
        GlobalManager.addUser(socket.id, user);

        SocketsManager.syncUsersSockets(socket);

        SocketsManager.emitUser(socket, 'user.login', { profile: response, token: response.token });
        SocketsManager.emitAll(socket, 'lobby.connect', { users: GlobalManager.getUsers() });
    },
    profile: (socket) => (data) => {
        const profile = UsersStore.get(socket.userId);

        SocketsManager.emitUser(socket, 'user.profile', {
            profile: UserSelector.clientProfileData(profile),
            session: UserSelector.clientSessionData(profile)
        });

    },
    logout: (socket) => () => {
        GlobalManager.removeUser(socket.id);

        SocketsManager.emitUser(socket, 'user.logout', { users: []});
        SocketsManager.emitAll(socket, 'lobby.disconnect', { users: GlobalManager.getUsers() });
    },
    disconnect: (socket) => () => {
        SocketUserStore.delete(socket.id);
        GlobalManager.removeUser(socket.id);
        SocketsManager.emitAll(socket, 'lobby.disconnect', { users: GlobalManager.getUsers() });
    },
    addRoom: (socket) => async (data) => {
        const { token } = data;
        const payload = jwt.decode(token, config.jwt.secret);
        const userRoomId = UserStore.get(socket.userId) && UserStore.get(socket.userId).roomId;
        if (userRoomId) {
            socket.server.to(`user_${socket.userId}`).emit('global.error', { message: 'Вы уже в комнате', type: 'error', code: 4 });
            return
        }
        const roomId = RoomsManager.addRoom({id: socket.userId });
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
        SocketsManager.emitAll(socket, 'rooms.get', { rooms: RoomsManager.getRooms() });
    },
    joinRoom: (socket) => async (data) => {
        const { roomId } = data;
        const userRoomId = UserStore.get(socket.userId) && UserStore.get(socket.userId).roomId;

        if (Number(roomId) === Number(userRoomId)) {
            socket.server.to(`user_${socket.userId}`).emit('global.error', { message: 'Уже в комнате', type: 'error', code: 2 });
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
        const userRoomId = UsersStore.get(socket.userId).roomId;
        if (userRoomId !== roomId) {
            socket.server.to(`user_${socket.userId}`).emit('global.error', { message: 'Вы не в этой комнате', type: 'error', code: 3 });
            return;
        }
        UsersManager.leaveRoom(roomId, socket.userId);

        SocketsManager.emitUser(socket, 'user.roomId', { roomId: null });
        SocketsManager.emitAll(socket, 'room.leave', { roomId, userId: socket.userId });

    },
    leaveLobby: function() {

    }
};