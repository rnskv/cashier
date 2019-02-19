const Manager = require('../Essenses/Manager');
const UserSelectors = require('../selectors/UserSelectors');
class UsersManager extends Manager {
    constructor(settings) {
        super(settings);
        console.log(this.managers.RoomsManager)
    }

    async joinRoom(roomId, userId) {
        const { HttpManager, RoomsManager } = this.managers;
        console.log(RoomsManager);
        const user = await HttpManager.request({
            method: 'POST',
            url: 'http://localhost:1337' + '/api/v1/user',
            body: {
                id: userId
            }
        });

        RoomsManager.addParticipant(roomId, UserSelectors.roomData(user));
        console.log('user', user);
        return UserSelectors.roomData(user);
    }

    leaveRoom() {

    }
}

module.exports = UsersManager;