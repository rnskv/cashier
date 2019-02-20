const Room = require('../Essenses/Room');
const userSelector = require('../selectors/UserSelectors');
const Manager = require('../Essenses/Manager');

const UserRoomStore = require('../store/UserRoom');

class RoomsManager extends Manager {
    constructor(settings) {
        super(settings);

        this.rooms = {};
    }

    addRoom(data) {
        const room = new Room({_id: data._id});
        const id = room.getId();
        this.rooms[id] = room;
        return id;
    }

    removeRoom(id) {
        this.kickAllPlayersFromRoom(id);
        delete this.rooms[id];
        console.log('Remove room', id);
        console.log(this.rooms);
    }

    getRooms() {
        let rooms = {...this.rooms};
        Object.keys(rooms).forEach(id => {
            rooms[id] = this.getRoom(id)
        });
        return rooms;
    }

    kickAllPlayersFromRoom(id) {
        console.log('id-', this.rooms[id]);
        this.rooms[id].participants.forEach(participant => {
            this.removeParticipant(id, participant.id);
            UserRoomStore.delete(participant.id)
        });
    }

    getRoom(id) {
        const room = this.rooms[id];
        //To selector
        return {
            id: room.id,
            creator: room.creator,
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