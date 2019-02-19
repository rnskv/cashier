const userSelector = require('../selectors/user');
const Manager = require('../Essenses/Manager');

class RoomsManager extends Manager {
    constructor(settings) {
        super(settings);
    }
}

module.exports = RoomsManager;