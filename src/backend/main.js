require('dotenv').load();

const express = require('express');
const http = require('http');
const redis = require('redis');

const client = redis.createClient();

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);


const useMainMiddlewares = require('./middlewares/main');
const useSocketMiddlewares = require('./middlewares/sockets');

const MongoManager = require('./managers').MongoManager;

MongoManager.connect();

useMainMiddlewares(app);
useSocketMiddlewares(io)(app);

server.listen(process.env.BACKEND_PORT, function () {
    console.log('Shut up and write code!');
});