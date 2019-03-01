const Manager = require('../Essenses/Manager');
const UserSelectors = require('../selectors/UserSelectors');
const UsersStore = require('../store/Users');
const config = require('config');

class UsersManager extends Manager {
    constructor(settings) {
        super(settings);
    }

    async joinRoom(roomId, position, userId) {
        const { HttpManager, RoomsManager } = this.managers;

        UsersStore.modify(userId, data => {
            data.roomId = roomId;
            return data;
        });

        const user = await HttpManager.request({
            method: 'POST',
            url: 'http://'+config.server.host+':1337' + '/api/v1/user',
            body: {
                id: userId
            }
        });
        if (!user) {
            throw new RnskvError({
                type: 'default',
                code: 0,
                message: `Пользователь не найден.`
            })
        }
        RoomsManager.addParticipant(roomId, position, UserSelectors.roomData(user));
        return UserSelectors.roomData(user);
    }

    leaveRoom(roomId, position, userId) {
        const { RoomsManager } = this.managers;
        UsersStore.modify(userId, data => {
            data.roomId = null;
            return data;
        });
        RoomsManager.removeParticipant(roomId, position, userId);
    }
}

module.exports = UsersManager;