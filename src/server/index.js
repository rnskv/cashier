const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendStatus(200);
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('hello', (data) => {
        console.log('hello', data)
    });
    socket.on('goodby', (data) => {
        console.log('goodby', data)
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});