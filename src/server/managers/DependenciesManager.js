const HttpManager = require('./HttpManager');
const LobbyManager = require('./lobby');
const RoomsManager = require('./rooms');
const GlobalManager = require('./GlobalManager');

class DependenciesManager {
    constructor() {
        this.managers = {
            http: HttpManager,
            lobby: LobbyManager,
            rooms: RoomsManager,
            global: GlobalManager
        }

    }

    getManagers(names) {
        return names.map(name => this.managers[name])
    }

    getManager(name) {
        return this.managers[name];
    }
}

module.exports = new DependenciesManager();