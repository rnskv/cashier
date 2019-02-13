const VKontakteStrategy = require('passport-vkontakte').Strategy;

module.exports = (passport) => {
    passport.use(new VKontakteStrategy({
            clientID:     6858499, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
            clientSecret: 'FFgtPLhNkt5G1TAH7PPT',
            callbackURL:  "http://localhost:1337/api/v1/login/vk/success",
            session: false,
        },
        function(accessToken, refreshToken, params, profile, done) {
            // console.log(params.email); // getting the email
            // User.findOrCreate({ vkontakteId: profile.id }, function (err, user) {
            //     return done(err, user);
            // });
            // console.log('User auth', refreshToken, accessToken, params, profile)
            console.log(444);
            return done(null, profile);
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
};

