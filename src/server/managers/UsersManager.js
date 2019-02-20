const Manager = require('../Essenses/Manager');
const UserSelectors = require('../selectors/UserSelectors');
const UserRoomStore = require('../store/UserRoom');

class UsersManager extends Manager {
    constructor(settings) {
        super(settings);
        console.log(this.managers.RoomsManager);
    }

    async joinRoom(roomId, userId) {

        const { HttpManager, RoomsManager } = this.managers;

        UserRoomStore.set(userId, roomId);

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
        UserRoomStore.delete(userId);
        RoomsManager.removeParticipant(roomId, userId);
    }
}

module.exports = UsersManager;