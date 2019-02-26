module.exports = {
    publicData: (profile) => ({
        login: profile.login,
        avatar: profile.avatar
    }),
    dbData: (profile) => ({
        uid: profile.id,
        name: profile.first_name,
        avatar: profile.photo,
        accessToken: profile.access_token,
        token: profile.token,
        accessLevel: profile.accessLevel
    }),
    roomData: (dbData) => ({
        id: dbData._id,
        uid: dbData.uid,
        name: dbData.name,
        avatar: dbData.avatar,
    }),
    socketData: (dbData) => ({
        id: dbData._id,
        accessLevel: dbData.accessLevel
    }),
    storeData: (dbData) => ({
        uid: dbData._id,
        name: dbData.name,
        avatar: dbData.avatar,
        token: dbData.token,
        accessLvl: dbData.accessLvl
    })
};