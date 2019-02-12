const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/', (req, res) => {
    res.send('Cashier api v1.0')
});

router.get('/user/register', userController.register);
router.get('/user/login', userController.logIn);

module.exports = router;