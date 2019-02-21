const jwt = require('jsonwebtoken');
const User = require( '../models/User');
const store = require('store');
const config = require('../config');

const userSelector = require('../selectors/UserSelectors');

module.exports = {
    register: function(req, res) {
        res.send('User register')
    },
    logIn: async function(req, res) {
        let result = null;
        const profile = req.body.profile;
        const params = req.body.params;

        let userData = await User.findOne({uid: profile.id});

        const token = jwt.sign({_id: userData._id}, 'supersecretlolitsjoke');

        const profileData = userSelector.dbData({...profile, ...params, token});

        if (userData) {
            await User.updateOne({_id: userData._id}, profileData)
        } else {
            const user = await new User(profileData).save();
            result = await user.save();
        }



        console.log('give token', token);

        await store.set('token', profileData.token);
        res.json(result)
    },
    loginRedirect: function(req, res) {
        res.redirect(`${config.client.host}:${config.client.port}/login/${store.get('token').split('.').join('_')}`);
    },
    getUserByToken: async function(req, res) {
        //@todo Сделать нормальный jwt;
        const token = req.body.token;
        let userData = await User.findOne({token});

        res.json(userData)
    },
    getUsersByIds: async function (req, res) {
        const ids = req.body.ids;
        console.log('Получаю пользователей с id:', ids);

        User.find({
            '_id': { $in: ids }
        }, function(err, docs){
            console.log(docs);
        });

    },
    getUserById: async function (req, res) {
        const id = req.body.id;
        console.log('Получаю пользователя с id:', id);

        let userData = await User.findOne({_id: id});
        res.json(userData)
    },
    getToken() {

    }
};