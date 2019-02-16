const User = require( '../models/User');
const store = require('store');
const config = require('../config');

module.exports = {
    register: function(req, res) {
        res.send('User register')
    },
    logIn: async function(req, res) {
        const profile = req.body.profile;
        const params = req.body.params;

        let userData = await User.findOne({uid: profile.id});
        const profileData = {
            uid: profile.id,
            name: profile.first_name,
            avatar: profile.photo,
            accessToken: params.access_token
        };
        let result = userData;

        if (userData) {
            await User.updateOne({_id: userData._id}, profileData)
        } else {
            const user = new User(profileData);
            result = await user.save();
        }
        // console.log(profileData.accessToken);
        await store.set('token', profileData.accessToken);
        res.json(result)
    },
    loginRedirect: function(req, res) {
        res.redirect(`${config.client.host}:${config.client.port}/login/${store.get('token')}`);
    },
    profile: async function(req, res) {
        //@todo Сделать нормальный jwt;
        const token = req.body.token;
        console.log('profile', token);
        let userData = await User.findOne({accessToken: token});

        console.log(userData);
        res.json(userData)
    },
    getToken() {

    }
};