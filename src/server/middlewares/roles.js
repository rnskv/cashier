const SocketUser = require('../store/SocketUser');
const ErrorsHandlers = require('../handlers/ErrorsHandlers');
module.exports = (socket, fn, accessLevel = 0) => {
    // console.log('Run role middleware with access level: ', accessLevel);
    const user = SocketUser.get(socket.id);
    // console.log('get', user);

    if (accessLevel === 0) {
        return fn(socket);
    }

    if (user && user.accessLevel >= accessLevel) {
        return fn(socket);
    }
    return ErrorsHandlers.accessDenied(socket)
};