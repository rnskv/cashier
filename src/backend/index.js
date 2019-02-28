 /**
     All code in this file DEPRECATED
     New backend entry point - main.js
 **/


const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendStatus(200);
});
let idLeaver = 0;
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const filters = {
    unique: (value, index, self) => self.indexOf(value) === index,
    essence: (value) => value !== undefined
};

function uniqueFilter(value, index, self) {
    return self.indexOf(value) === index;
}

let users = {};
let lobbyTokens = {};

function leaveRoom(socket) {
    socket.leave && socket.leave('lobby');
    delete lobbyTokens[socket.id];
    showLobbyUsers();
}

function showLobbyUsers() {
    const lobbyIds = Object.keys(lobbyTokens);
    const lobbyTokensArray = lobbyIds.map(id => lobbyTokens[id]);
    const lobbyUsers = lobbyTokensArray.map(token => users[token]);
    io.to('lobby').emit('lobby.users', lobbyUsers.filter(filters.unique).filter(filters.essence));
}

io.on('connection', function(socket){
    socket.on('disconnect', function() {
        if (socket.token) {
            leaveRoom(socket)
        }
    });

    socket.on('user.login', function(data) {

        const { login, password } = data;

        const token = random(111111111, 999999999);
        const profile = {
            id: token,
            login,
            password,
            avatar: 'https://pp.userapi.com/c830400/v830400985/c0fdc/-OcKvSuTwUg.jpg?ava=1',
            level: 1,
        };

        users[token] = profile;
        socket['token'] = token;

        socket.emit('user.token', token);
        socket.emit('user.profile', profile);
    });

    socket.on('user.profile', function(token) {
        if (users[token]) {
            socket['token'] = token;
            socket.emit('user.profile', users[token]);
        } else {
            socket.emit('user.error', {message: 'Ошибка авторизации', type: 'AUTH_ERROR'})
        }
    });


    socket.on('lobby.join', function(token) {
        socket.join('lobby');
        lobbyTokens[socket.id] = token;
        showLobbyUsers();
    });

    socket.on('lobby.leave', () => leaveRoom(socket));

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});