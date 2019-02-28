class LobbyManager {
    constructor(id) {
        this.users = {};
        this.rooms = {};
    }

    addRoom() {

    }

    deleteRoom(id) {

    }

    getUsersCount() {
        return Object.keys(this.users).length
    }

    join(id, socket) {
        //Получаем токен из сокета, храним токен в комнате
    }

    leave(socket) {
        //Удаляем проперти объекта равное socket.id
    }
}

module.exports = LobbyManager;