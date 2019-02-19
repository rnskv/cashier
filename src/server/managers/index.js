const HttpManager = require('./HttpManager');
const LobbyManager = require('./LobbyManager');
const RoomsManager = require('./RoomManager');
const GlobalManager = require('./GlobalManager');
const UserManager = require('./UserManager');
const MongoManager = require('./MongoManager');


module.exports.HttpManager = new HttpManager();
module.exports.LobbyManager = new LobbyManager();
module.exports.RoomsManager = new RoomsManager({managers: {HttpManager, GlobalManager}});
module.exports.GlobalManager = new GlobalManager({managers: {HttpManager, RoomsManager}});
module.exports.UserManager = UserManager;
module.exports.MongoManager = new MongoManager();