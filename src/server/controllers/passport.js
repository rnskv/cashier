const passport = require('passport');

const HttpManager = require('../managers/').HttpManager;

const User = require('../models/User');
const userSelector = require('../selectors/user');
const userController = require('../controllers/user');

module.exports = {
    vkLogin: passport.authenticate('vkontakte'),
    vkLoginSuccess: passport.authenticate('vkontakte', { failureRedirect: '/api/v1/login' }),
    vkLoginFailure: function() {
        console.log('123');
    },
    vkLoginCallback: async function(accessToken, refreshToken, params, profile, done) {
        console.log('vkLoginCallback');
        await HttpManager.request({
            method: 'POST',
            url: 'http://localhost:1337' + '/api/v1/user/login',
            body: {
                profile: profile._json,
                params,
            }
        });

        return done(null, profile);
    }
};