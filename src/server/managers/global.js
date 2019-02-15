class Global {
    constructor(id) {
        this.lobbies = {};
        this.users = {};
    }

    addUser(socketId, user) {
        console.log('global.addUser');
        this.users[socketId] = user;
    }

    removeUser(socketId) {
        delete this.users[socketId]
    }

    addLobby() {

    }

    deleteLobby(id) {

    }

    getLobbiesCount() {

    }

    findFreeLobby() {

    }

    getUsers() {
        console.log(Object.keys(this.users).map(key => this.users[key].getProfile()));
        return Object.keys(this.users).map(key => this.users[key].getProfile())
    }
}

module.exports = new Global();