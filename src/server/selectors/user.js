module.exports = {
    publicData: (profile) => {
        return {
            login: profile.login,
            avatar: profile.avatar
        }
    }
};