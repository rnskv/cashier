const express = require('express');
const http = require('http');
const redis = require('redis');

const client = redis.createClient();

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);


const useMainMiddlewares = require('./middlewares/main');
const useSocketMiddlewares = require('./middlewares/sockets');

const config = require('./config');

const MongoManager = require('./managers').MongoManager;

MongoManager.connect();

useMainMiddlewares(app);
useSocketMiddlewares(io)(app);

server.listen(config.server.port, function () {
    console.log(config.server.startMessage);
});