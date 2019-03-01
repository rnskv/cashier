const VKontakteStrategy = require('passport-vkontakte').Strategy;
const passportController = require('../controllers/PassportController');

module.exports = (passport) => {
    passport.use(new VKontakteStrategy({
            clientID:     6858499, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
            clientSecret: 'FFgtPLhNkt5G1TAH7PPT',
            callbackURL:  `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/v1/login/vk/success`,
            session: false,
        }, passportController.vkLoginCallback
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
};

