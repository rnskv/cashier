class SocketsManager {
    constructor(state) {
        this.state = {};
    }

    syncUsersSockets(socket) {
        socket.join(`user_${socket.userId}`);
    }

    emitUser(socket, event, data) {
        console.log('emitUser', socket.userId);
        socket.server.to(`user_${socket.userId}`).emit(event, data);
    }

    emitAll(socket, event, data) {
        console.log('emitAll', event, data);
        socket.server.emit(event, data);
    }
}


module.exports = SocketsManager;