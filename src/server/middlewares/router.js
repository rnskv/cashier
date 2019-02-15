const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const passportController = require('../controllers/passport');


router.get('/', (req, res) => {
    res.send('Cashier api v1.0')
});

router.get('/login/vk', passportController.vkLogin);
router.get('/login/vk/success', passportController.vkLoginSuccess);

router.get('/redirect/main', (req, res) => {res.redirect('http://localhost:9000/test')});

router.post('/user/register', userController.register);
router.post('/user/login', userController.logIn);

router.get('/login', (req, res) => {
    res.send('Mock for login page');
});


module.exports = router;