module.exports = {
    publicData: (profile) => ({
        login: profile.login,
        avatar: profile.avatar
    }),
    dbData: (profile) => ({
        uid: profile.id,
        name: profile.first_name,
        avatar: profile.photo,
        accessToken: profile.access_token
    }),
    roomData: (dbData) => ({
        uid: dbData.uid,
        name: dbData.name,
        avatar: dbData.avatar,
    })
};