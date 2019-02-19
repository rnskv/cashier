const HttpManager = require('./HttpManager');
const LobbyManager = require('./lobby');
const RoomsManager = require('./rooms');
const GlobalManager = require('./GlobalManager');
const UserManager = require('./user');
const MongoManager = require('./mongo');


module.exports.HttpManager = new HttpManager();
module.exports.LobbyManager = new LobbyManager();
module.exports.RoomsManager = new RoomsManager({managers: {HttpManager, GlobalManager}});
module.exports.GlobalManager = new GlobalManager({managers: {HttpManager, RoomsManager}});
module.exports.UserManager = UserManager;
module.exports.MongoManager = new MongoManager();
