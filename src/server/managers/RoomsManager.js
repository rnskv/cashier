const Room = require('../Essenses/Room');
const userSelector = require('../selectors/UserSelectors');
const Manager = require('../Essenses/Manager');

const UsersStore = require('../store/Users');

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
        this.rooms[id].startGame();
    }

    removeRoom(id) {
        this.kickAllPlayersFromRoom(id);
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
        this.rooms[id].participants.forEach(participant => {
            this.removeParticipant(id, participant.id);
            UsersStore.modify(participant.id, data => {
                data.roomId = null;
                return data;
            });
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
            creatorId: room.creatorId,
            participants: room.participants
        }
    }

    addParticipant(roomId, user) {
        this.rooms[roomId].join(user);
    }

    removeParticipant(roomId, userId) {
        this.rooms[roomId].leave(userId);
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