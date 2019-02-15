class Global {
    constructor(id) {
        this.lobbies = {};
        this.users = {};
    }

    addUser(socketId, user) {
        this.users[socketId] = user;
    }

    removeUser(socketId) {

    }

    addLobby() {

    }

    deleteLobby(id) {

    }

    getLobbiesCount() {

    }

    findFreeLobby() {

    }
}

module.exports = new Global();