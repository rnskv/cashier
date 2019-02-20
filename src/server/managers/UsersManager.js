const Manager = require('../Essenses/Manager');
const UserSelectors = require('../selectors/UserSelectors');
class UsersManager extends Manager {
    constructor(settings) {
        super(settings);
        console.log(this.managers.RoomsManager);
        this.usersRoomId = {};
    }

    async joinRoom(roomId, userId) {
        const { HttpManager, RoomsManager } = this.managers;

        const alreadyInRoom = RoomsManager.userInRoom(roomId, userId);
        this.usersRoomId[userId] = roomId;
        if (alreadyInRoom) {
            const error = { message: 'Уже в комнате', type: 'error', code: 2 };
            return error;
        }

        const user = await HttpManager.request({
            method: 'POST',
            url: 'http://localhost:1337' + '/api/v1/user',
            body: {
                id: userId
            }
        });

        RoomsManager.addParticipant(roomId, UserSelectors.roomData(user));

        return UserSelectors.roomData(user);
    }

    leaveRoom(roomId, userId) {
        const { RoomsManager } = this.managers;
        delete this.usersRoomId[userId];
        RoomsManager.removeParticipant(roomId, userId);
    }

    getUserRoomId(userId) {
        return this.usersRoomId[userId]
    }
}

module.exports = UsersManager;