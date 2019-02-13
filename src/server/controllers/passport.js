const passport = require('passport');

module.exports = {
    vkLogin: passport.authenticate('vkontakte'),
    vkLoginSuccess: passport.authenticate('vkontakte', {
            successRedirect: '/',
            failureRedirect: '/api/v1/login'
        }),
    vkLoginFailure: function() {

    },
    vkLoginCallback: function(accessToken, refreshToken, params, profile, done) {
        // console.log(params.email); // getting the email
        // User.findOrCreate({ vkontakteId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
        // console.log('User auth', refreshToken, accessToken, params, profile)
        console.log(profile);
        return done(null, profile);
    }
};