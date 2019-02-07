const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendStatus(200);
});

let users = [];

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('hello', (data) => {
        console.log('hello', data)
    });
    socket.on('goodby', (data) => {
        console.log('goodby', data)
    });

    socket.on('lobby.join', (data) => {
        const { login, avatar, lvl } = data;
        users.push({
            login, avatar, lvl, id: socket.id
        })
    });

    socket.on('lobby.leave', (data) => {
        console.log('goodby', data)
    });

    socket.on('lobby.users', (data) => {
        console.log('goodby', data)
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});