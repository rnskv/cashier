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
        id: dbData._id,
        name: dbData.name,
        avatar: dbData.avatar,
        token: dbData.token,
        accessLvl: dbData.accessLvl
    }),
    clientProfileData: (profile) => ({
        id: profile.id,
        uid: profile.uid,
        name: profile.name,
        avatar: profile.avatar,
        accessLvl: profile.accessLvl
    }),
    clientSessionData: (profile) => ({
        token: profile.token,
        roomId: profile.roomId
    })
};