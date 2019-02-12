const User = require( '../models/User');

module.exports = {
    register: function(req, res) {
        console.log(req.body);
        res.send('User register')
    },
    logIn: function(req, res) {

        res.send('User logIn')
    }
};