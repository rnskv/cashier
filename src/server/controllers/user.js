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
        console.log(params);

        if (userData) {
            console.log('User found - ', profile.id);
            await User.updateOne({_id: userData._id}, profileData)
        } else {
            console.log('User create - ', profile.id);
            const user = new User(profileData);
            result = await user.save();
        }
        store.set('token', result.accessToken);
        res.json(result)
    },
    loginRedirect: function(req, res) {
        console.log(res.token);
        res.redirect(`${config.client.host}:${config.client.port}/test/${store.get('token')}`);
    },
    profile: async function(req, res) {
        //@todo Сделать нормальный jwt;
        const token = req.body.token;
        let userData = await User.findOne({accessToken: token});
        console.log('Find user with token', token);
        console.log('Find', userData);
        res.json(userData)
    },
    getToken() {

    }
};