const User = require( '../models/User');

module.exports = {
    register: function(req, res) {
        res.send('User register')
    },
    logIn: function(req, res) {
        console.log('logIn user method activate');
        res.json({
            hello: 'world'
        })
    }
};