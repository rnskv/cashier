const jwt = require('jsonwebtoken');
const User = require( '../models/User');
const store = require('store');

const userSelector = require('../selectors/UserSelectors');

module.exports = {
    register: function(req, res) {
        res.send('User register')
    },
    logIn: async function(req, res) {
        let result = null;
        const profile = req.body.profile;
        const params = req.body.params;
        console.log(profile);
        let userData = await User.findOne({ uid: profile.id });
        let token;

        let profileData;

        if (userData) {
            profileData = userSelector.dbData({ ...profile, ...params });
            await User.updateOne({_id: userData._id}, profileData)
        } else {
            profileData = userSelector.dbData({ ...profile, ...params });
            userData = await new User(profileData).save();
        }

        token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);
        result = await User.updateOne({ _id: userData._id }, { token });

        await store.set('token', token);

        res.json(result);
    },
    loginRedirect: function(req, res) {
        res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/login/${store.get('token').split('.').join('*')}`);
    },
    getUserByToken: async function(req, res) {
        //@todo Сделать нормальный jwt;
        const token = req.body.token;
        let userData = await User.findOne({token});
        res.json(userData)
    },
    getUsersByIds: async function (req, res) {
        const ids = req.body.ids;

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