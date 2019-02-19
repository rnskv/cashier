const HttpManager = require('./HttpManager');
const LobbyManager = require('./LobbyManager');
const RoomsManager = require('./RoomsManager');
const GlobalManager = require('./GlobalManager');
const MongoManager = require('./MongoManager');


module.exports.HttpManager = new HttpManager();
module.exports.LobbyManager = new LobbyManager();
module.exports.MongoManager = new MongoManager();
module.exports.RoomsManager = new RoomsManager({managers: {HttpManager, GlobalManager}});
module.exports.GlobalManager = new GlobalManager({managers: {HttpManager, RoomsManager}});
