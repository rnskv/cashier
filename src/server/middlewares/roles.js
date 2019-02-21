module.exports = (socket, fn, accessLevel = 1) => {
    console.log('Run role middleware with access level: ', accessLevel);
    return fn(socket);
};