const Managers = require('../managers');
const GlobalManager = Managers.GlobalManager;
const RoomsManager = Managers.RoomsManager;
const HttpManager = Managers.HttpManager;

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
        console.log('User log in ->', user._id);
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
        const roomId = RoomsManager.addRoom({_id: token});

        socket.server.emit('room.add', { room: RoomsManager.getRoom(roomId) });
    },
    getRooms: (socket) => (data) => {
        socket.server.emit('rooms.get', { rooms: RoomsManager.getRooms() });
    },
    joinRoom: (socket) => (data) => {
        const { roomId, token } = data;
        console.log(`room - ${roomId}, token - ${token}`);

        // const roomId = RoomsManager.addRoom({_id: token});
        //
        // const RoomManager = GlobalManager.rooms[roomId];
        // console.log(RoomManager.participants);

        //Add verification for token
        // socket.join(`room_${roomId}`);
        // RoomManager.addParticipant(token);

        // socket.server.emit('room.join', { users: RoomManager.getParticipants() });
    },
    leaveLobby: function() {

    },
    leaveRoom: function() {

    }
};