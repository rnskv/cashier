const Room = require('../Essenses/Room');
const userSelector = require('../selectors/UserSelectors');
const Manager = require('../Essenses/Manager');

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

    getRoom(id) {
        const room = this.rooms[id];
        return {
            id: room.id,
            creator: room.creator,
            participants: room.participants
        }
    }

    addParticipant(roomId, user) {
        this.rooms[roomId].join(user);
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