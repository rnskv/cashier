const userSelector = require('../selectors/user');

class UserManager {
    constructor(profile, token) {
        this.profile = profile;
        this.token = token;
    }
    getProfile() {
        return userSelector.publicData(this.profile);
    }
}

module.exports = UserManager;