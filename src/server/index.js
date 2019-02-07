const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendStatus(200);
});

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let users = {};
let lobbyUsers = [];
io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('user.login', function(data) {
        const { login, password } = data;

        const token = random(111111111, 999999999);

        const profile = {
            id: socket.id,
            login,
            password,
            avatar: 'https://pp.userapi.com/c830400/v830400985/c0fdc/-OcKvSuTwUg.jpg?ava=1',
            level: 1,
        };

        users[token] = profile;

        socket.emit('user.token', token);
        socket.emit('user.profile', profile);
    });

    socket.on('user.profile', function(token) {
        socket.emit('user.profile', users[token]);
    });


    socket.on('lobby.join', function(token) {
        socket.join('lobby');
        lobbyUsers.push(token);
        let res = lobbyUsers.map(token => users[token]);
        console.log(res);
        io.to('lobby').emit('lobby.users', res);
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});