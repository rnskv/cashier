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
        return Object.keys(this.users).map(key => {
            const profile = this.users[key].profile;
            return {
                login: profile.login,
                avatar: profile.avatar
            }
        });
    }
}

module.exports = new Global();