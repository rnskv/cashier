class SocketsManager {
    constructor(state) {
        this.state = {};
    }

    syncUsersSockets(socket, userId) {
        socket.userId = userId;
        socket.join(`user_${userId}`);
    }

    joinRoom(socket, roomName) {
        socket.join(roomName);
    }

    leaveRoom(socket, roomName) {
        socket.leave(roomName)
    }

    emitUser(socket, event, data) {
        socket.server.to(`user_${socket.userId}`).emit(event, data);
    }

    emitUser(socket, event, data) {
        socket.server.to(`user_${socket.userId}`).emit(event, data);
    }

    emitOtherUser(socket, userId, event, data) {
        console.log('emit', userId, event);
        socket.server.to(`user_${userId}`).emit(event, data);
    }

    emitRoom(socket, nameRoom, event, data) {
        socket.server.to(nameRoom).emit(event, data);
    }

    emitAll(socket, event, data) {
        socket.server.emit(event, data);
    }

}


module.exports = SocketsManager;