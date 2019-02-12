const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/user/register', userController.register);
router.get('/user/login', userController.logIn);

module.exports = router;