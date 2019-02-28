const userSelector = require('../selectors/UserSelectors');

class User {
    constructor(profile, token) {
        this.profile = profile;
        this.token = token;
    }
    getProfile() {
        return userSelector.publicData(this.profile);
    }
}

module.exports = User;