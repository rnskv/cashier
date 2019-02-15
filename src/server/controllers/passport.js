const passport = require('passport');

const HttpManager = require('../managers/http');

const User = require('../models/User');
const userSelector = require('../selectors/user');
const userController = require('../controllers/user');

module.exports = {
    vkLogin: passport.authenticate('vkontakte'),
    vkLoginSuccess: passport.authenticate('vkontakte', { failureRedirect: '/api/v1/login' }),
    vkLoginFailure: function() {

    },
    vkLoginCallback: async function(accessToken, refreshToken, params, profile, done) {
        // console.log(params.email); // getting the email
        // console.log(profile);

        const response = await HttpManager.request({
            method: 'POST',
            url: 'http://localhost:1337' + '/api/v1/user/login',
            body: {
                profile: profile._json,
                params,
            }
        });
        console.log('2tf');
        return done(null, profile);
        // User.findOrCreate({
        //     uid: profile.id,
        //     name: profile.first_name,
        //     avatar: profile.photo,
        // }, function (err, user) {
        //     console.log(user);
        //     return done(err, user);
        // });
    }
};