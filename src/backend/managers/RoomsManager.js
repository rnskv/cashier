const Room = require('../Essenses/Room');
const userSelector = require('../selectors/UserSelectors');
const Manager = require('../Essenses/Manager');

const UsersStore = require('../store/Users');
const UserSelector = require('../selectors/UserSelectors');

const RnskvError = require('../Essenses/RnskvError');

class RoomsManager extends Manager {
    constructor(settings) {
        super(settings);

        this.rooms = {};

        this.roomsCount = 0;
    }

    addRoom(data) {
        this.roomsCount += 1;
        const room = new Room({id: this.roomsCount, creatorId: data.id});
        const id = room.getId();
        this.rooms[id] = room;
        return id;
    }

    startGame(id) {
        return this.rooms[id].startGame();
    }

    removeRoom(id) {
        this.kickAllPlayersFromRoom(id);
        this.rooms[id].remove();
        delete this.rooms[id];
    }

    getRooms() {
        let rooms = {...this.rooms};
        Object.keys(rooms).forEach(id => {
            rooms[id] = this.getRoom(id)
        });
        return rooms;
    }

    kickAllPlayersFromRoom(id) {
        Object.values(this.rooms[id].participants).forEach(participant => {
            if (participant) {
                this.removeParticipant(id, participant.id);
                UsersStore.modify(participant.id, data => {
                    data.roomId = null;
                    return data;
                });
            }
        });
    }

    getRoomGame(id) {
        try {
            return this.rooms[id].game;
        } catch (error) {
            throw new RnskvError({
                type: 'default',
                code: 0,
                message: `Не удалось получить комнату с указанным id.`
            })
        }
    }

    getRoom(id) {
        const room = this.rooms[id];
        //To selector
        return {
            id: room.id,
            creator: UserSelector.clientProfileData(UsersStore.get(room.creatorId)),
            participants: room.participants,
            isStarted: room.isStarted()
        }
    }

    getRoomParticipantsCount(id) {
        const room = this.rooms[id];
        //To selector
        return Object.values(room.participants).filter(participant => participant !== null).length;
    }

    findFreePosition(roomId) {
        return this.rooms[roomId].findFreePosition();
    }

    getParticipantPosition(roomId, userId) {
        return this.rooms[roomId].getParticipantPosition(userId);
    }

    addParticipant(roomId, position,  user) {
        // console.log('Join into', roomId, ' at position ', position, ' user: ', user)
        this.rooms[roomId].join(user, position);
    }

    removeParticipant(roomId, position, userId) {
        this.rooms[roomId].leave(userId, position);
    }

    userInRoom(roomId, userId) {
        return this.rooms[roomId].inRoom(userId);
    }

    getUserRooms(userId) {
        return this.rooms.filter(room => {
            return room.participants.forEach()
        })
    }
    // addUser() {
    //
    // }
    //
    // getUser() {
    //
    // }
    //
    // getUsers() {
    //
    // }
    //
    // getUniqueUsers() {
    //
    // }
}

module.exports = RoomsManager;