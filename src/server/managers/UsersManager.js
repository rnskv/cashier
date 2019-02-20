const Manager = require('../Essenses/Manager');
const UserSelectors = require('../selectors/UserSelectors');
class UsersManager extends Manager {
    constructor(settings) {
        super(settings);
        console.log(this.managers.RoomsManager);
        this.usersRoomId = {};
        this.usersProccess = {};
    }

    async joinRoom(roomId, userId) {

        const { HttpManager, RoomsManager } = this.managers;

        this.usersRoomId[userId] = roomId;

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