const passport = require('passport');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = {
    vkLogin: passport.authenticate('vkontakte'),
    vkLoginSuccess: passport.authenticate('vkontakte', {
            successRedirect: '/',
            failureRedirect: '/api/v1/login'
        }),
    vkLoginFailure: function() {

    }
};