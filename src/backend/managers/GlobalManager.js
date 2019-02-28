const Manager = require('../Essenses/Manager');

class GlobalManager extends Manager {
    constructor(settings) {
        super(settings);
        this.rooms = {};
        this.users = {};

        this.addRoom(0);
    }

    addUser(socketId, user) {
        this.users[socketId] = user;
    }

    removeUser(socketId) {
        delete this.users[socketId]
    }

    addRoom(token) {
        // this.rooms[token] = new Rooms(token);
    }

    deleteRoom(id) {

    }

    getLobbiesCount() {

    }

    findFreeLobby() {

    }

    getUsers() {
        return Object.keys(this.users).map(key => this.users[key].getProfile())
    }

    getUserByToken(token) {
        return this.getUsers().filter(user => user.token === token)
    }

    getUsersByTokens(tokens) {
        return tokens.map(token => this.getUserByToken(token))
    }
}

module.exports = GlobalManager;