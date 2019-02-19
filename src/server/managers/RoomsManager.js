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
        return Object.keys(this.rooms).map(id => this.getRoom(id));
    }

    getRoom(id) {
        const room = this.rooms[id];
        return {
            id: room.id,
            creator: room.creator,
            participants: room.participants
        }
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