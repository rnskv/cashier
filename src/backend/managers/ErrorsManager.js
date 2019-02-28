const Manager = require('../Essenses/Manager');

class ErrorsManager extends Manager {
    constructor(settings) {
        super(settings);
    }
    sendError(socket, error) {
        socket.emit('error', error)
    }
}

module.exports = ErrorsManager;