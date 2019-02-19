const express = require('express');

const router = express.Router();

const userController = require('../controllers/UserController');
const passportController = require('../controllers/PassportController');


router.get('/', (req, res) => {
    res.send('Cashier api v1.0')
});

router.get('/login/vk', passportController.vkLogin);
router.get('/login/vk/success', passportController.vkLoginSuccess, userController.loginRedirect);

router.post('/user/register', userController.register);
router.post('/user/login', userController.logIn);
router.post('/user/profile', userController.profile);

router.get('/login', (req, res) => {
    res.send('Mock for login page');
});


module.exports = router;