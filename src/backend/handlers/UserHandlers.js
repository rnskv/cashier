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

const RnskvError = require('../Essenses/RnskvError');

const request = require('request');

module.exports = {
    login: (socket) => async (data) => {
        //отправляем запрос на сервер с data.password and data.login;
        const { token } = data;
        const decodedToken = jwt.decode(data.token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        const response = await HttpManager.request({
            method: 'POST',
            url: `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/v1/user/`,
            body: {
                id: decodedToken.id
            }
        });

        if (!response) {
            throw new RnskvError({
                type: 'default',
                code: 0,
                message: `Во время авторизации произошла ошибка.`
            })
        }

        const user = new User(response, response.token);

        UsersStore.update(decodedToken.id, UserSelector.storeData(user.profile));

        SocketUserStore.set(socket.id, UserSelector.socketData(user.profile));
        GlobalManager.addUser(socket.id, user);

        SocketsManager.syncUsersSockets(socket, userId);

        SocketsManager.emitUser(socket, 'user.login', { profile: response, token: response.token });
        SocketsManager.emitAll(socket, 'lobby.connect', { users: GlobalManager.getUsers() });
    },
    profile: (socket) => (data) => {
        const profile = UsersStore.get(data.user.id);

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
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        const userRoomId = UserStore.get(userId) && UserStore.get(userId).roomId;

        if (!decodedToken.id) {
            throw new RnskvError({
                type: 'default',
                code: 0,
                message: 'Невалидный userId'
            })
        }
        if (userRoomId) {
            throw new RnskvError({
                type: 'default',
                code: 0,
                message: `Сначала выйдите из комнаты.`
            })
        }

        const roomId = RoomsManager.addRoom({id: userId });
        await UsersManager.joinRoom(roomId, RoomsManager.findFreePosition(roomId), userId);

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
        console.log(data);
        const { token, roomId, position = RoomsManager.findFreePosition(roomId)} = data;
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        if (!position) {
            throw new RnskvError({
                type: 'default',
                code: 0,
                message: `Свободных мест нет.`
            })
        }

        const userRoomId = UserStore.get(userId) && UserStore.get(userId).roomId;

        if (Number(roomId) === Number(userRoomId)) {
            throw new RnskvError({
                type: 'default',
                code: 0,
                message: `Вы уже в этой комнате.`
            })
        }

        if (userRoomId) {
            UsersManager.leaveRoom(userRoomId, RoomsManager.getParticipantPosition(userRoomId, userId), userId);
            SocketsManager.emitAll(socket, 'room.leave', { roomId: userRoomId, position });
        }
        console.log('position', position);
        let user = await UsersManager.joinRoom(roomId, position, userId);

        SocketsManager.emitUser(socket, 'user.roomId', { roomId });
        SocketsManager.emitAll(socket, 'room.join', { roomId, user, position });
    },
    leaveRoom: (socket) => (data) => {
        const { token } = data;

        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const { roomId, position = RoomsManager.getParticipantPosition(roomId, userId)} = data;
        const userRoomId = UsersStore.get(userId).roomId;

        const room = RoomsManager.getRoom(roomId);
        if (userRoomId !== roomId) {
            throw new RnskvError({
                type: 'default',
                code: 0,
                message: `Вы не находитесь в этой комнате.`
            });
        }

        UsersManager.leaveRoom(roomId, position, userId);

        if (RoomsManager.getRoomParticipantsCount(roomId) <= 0) {
            RoomsManager.removeRoom(roomId);
            SocketsManager.emitAll(socket, 'room.remove', { roomId, position });
        }


        SocketsManager.emitUser(socket, 'game.update.room', { room: room });
        SocketsManager.emitUser(socket, 'game.leave');

        SocketsManager.emitUser(socket, 'user.roomId', { roomId: null });
        SocketsManager.emitAll(socket, 'room.leave', { roomId, userId, position });

    },
    leaveLobby: function() {

    }
};