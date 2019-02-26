const Manager = require('../Essenses/Manager');
const UserSelectors = require('../selectors/UserSelectors');
const UsersStore = require('../store/Users');

class UsersManager extends Manager {
    constructor(settings) {
        super(settings);
    }

    async joinRoom(roomId, userId) {

        const { HttpManager, RoomsManager } = this.managers;

        UsersStore.modify(userId, data => {
            data.roomId = roomId;
            return data;
        });

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
        UsersStore.modify(userId, data => {
            data.roomId = null;
            return data;
        });
        RoomsManager.removeParticipant(roomId, userId);
    }
}

module.exports = UsersManager;