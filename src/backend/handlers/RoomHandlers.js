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

    }
};