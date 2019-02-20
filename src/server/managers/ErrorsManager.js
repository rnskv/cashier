const Manager = require('../Essenses/Manager');

class ErrorsManager extends Manager {
    constructor(settings) {
        super(settings);
        console.log(this.managers.RoomsManager)
    }
    sendError(socket, error) {
        console.log('sendError', error);
        socket.emit('error', error)
    }
}

module.exports = ErrorsManager;