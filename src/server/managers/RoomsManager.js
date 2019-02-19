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