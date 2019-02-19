const userSelector = require('../selectors/user');
const Manager = require('../Essenses/Manager');

console.log('Proto: ', Manager.__proto__);
class RoomsManager extends Manager {
    constructor(settings) {
        super(settings);
        console.log('rooms', this.managers)
    }
}

module.exports = RoomsManager;