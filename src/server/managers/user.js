class User {
    constructor(profile, token) {
        this.profile = profile;
        this.token = token;
    }
    getProfile() {
        const profile = this.profile;
        return {
            name: profile.name,
            avatar: profile.avatar
        }
    }
}

module.exports = User;