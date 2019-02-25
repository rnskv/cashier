const Managers = require('../managers');
const SocketsManager = Managers.SocketsManager;

module.exports = {
    accessDenied: (socket) => (data) => {
        SocketsManager.emitUser(socket, 'global.error', { message: 'Нет доступа', type: 'error', code: 4 });
    }
};