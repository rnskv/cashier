const Http = require('./HttpManager');
const Lobby = require('./LobbyManager');
const Rooms = require('./RoomsManager');
const Global = require('./GlobalManager');
const Mongo = require('./MongoManager');
const Users = require('./UsersManager');
const Errors = require('./ErrorsManager');

const HttpManager = new Http();
const LobbyManager = new Lobby();
const GlobalManager = new Global();
const MongoManager = new Mongo();
const ErrorsManager = new Errors();

const RoomsManager = new Rooms({managers: {HttpManager, GlobalManager}});
const UsersManager = new Users({managers: {HttpManager, RoomsManager, ErrorsManager}});


module.exports.HttpManager = HttpManager;
module.exports.LobbyManager = LobbyManager;
module.exports.MongoManager = MongoManager;
module.exports.RoomsManager = RoomsManager;
module.exports.UsersManager = UsersManager;
module.exports.GlobalManager = GlobalManager;
module.exports.ErrorsManager = ErrorsManager;

