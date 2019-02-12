const express = require('express');
const passport = require('passport');

const router = express.Router();
const VKontakteStrategy = require('passport-vkontakte').Strategy;

const userController = require('../controllers/user');


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
        return done(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.get('/login/vk', passport.authenticate('vkontakte'));

router.get('/login/vk/success',
    passport.authenticate('vkontakte', {
        successRedirect: '/',
        failureRedirect: '/api/v1/login'
    })
);

router.get('/', (req, res) => {
    res.send('Cashier api v1.0')
});

router.post('/user/register', userController.register);
router.post('/user/login', userController.logIn);

router.get('/login', (req, res) => {
    res.send('Mock for login page');
});


module.exports = router;