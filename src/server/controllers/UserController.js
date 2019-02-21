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
        let token;

        let profileData;

        if (userData) {
            profileData = userSelector.dbData({...profile, ...params});
            await User.updateOne({_id: userData._id}, profileData)
        } else {
            profileData = userSelector.dbData({...profile, ...params});
            userData = await new User(profileData).save();
        }

        console.log('userdata', userData._id);
        token = jwt.sign({id: userData._id}, 'supersecretlolitsjoke');
        console.log('token', token);
        result = await User.updateOne({_id: userData._id}, { token });

        await store.set('token', token);

        console.log('first', token);
        res.json(result);
    },
    loginRedirect: function(req, res) {
        console.log('second');

        res.redirect(`${config.client.host}:${config.client.port}/login/${store.get('token').split('.').join('*')}`);
    },
    getUserByToken: async function(req, res) {
        //@todo Сделать нормальный jwt;
        const token = req.body.token;
        let userData = await User.findOne({token});
        console.log('Find User By Token', userData, token);
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