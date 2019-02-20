 /**
     All code in this file DEPRECATED
     New server entry point - main.js
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
    // console.log('Lobby leave socket ' + socket.id + ' with token ' + token);
    socket.leave && socket.leave('lobby');
    delete lobbyTokens[socket.id];
    showLobbyUsers();
}

function showLobbyUsers() {
    // const lobbyUsers = Object.keys(lobbyTokens).map(socketId => users[lobbyTokens[socketId]]);
    const lobbyIds = Object.keys(lobbyTokens);
    const lobbyTokensArray = lobbyIds.map(id => lobbyTokens[id]);
    const lobbyUsers = lobbyTokensArray.map(token => users[token]);
    //
    // console.log(lobbyIds);
    // console.log(lobbyTokensArray);
    // console.log(lobbyUsers);

    io.to('lobby').emit('lobby.users', lobbyUsers.filter(filters.unique).filter(filters.essence));
}

io.on('connection', function(socket){
    // console.log('a user connected');
    socket.on('disconnect', function() {
        // console.log('WORAFAK');
        if (socket.token) {
            // console.log(socket.token, 'leave')
            leaveRoom(socket)
        }
    });

    socket.on('user.login', function(data) {

        const { login, password } = data;

        const token = random(111111111, 999999999);
        // console.log('user socket ' + socket.id + ' with token ' + token);
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
        // console.log('Lobby join socket ' + socket.id + ' with token ' + token);
        socket.join('lobby');

        lobbyTokens[socket.id] = token;


        showLobbyUsers();

        // if (token && lobbyUsers.filter(userToken => userToken === token).length === 0) {
        //     lobbyUsers.push(token);
        //     // console.log(res);
        //     let res = lobbyUsers.map(token => users[token]);
        //     io.to('lobby').emit('lobby.users', res);
        // } else {
        //     socket.emit('user.error', {message: 'Вы уже в комнате с другого устройства или вкладки'});
        // }
    });

    socket.on('lobby.leave', () => leaveRoom(socket));

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});