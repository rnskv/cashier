const passport = require('passport');
const bodyParser = require('body-parser');
const router = require('./router');
const usePassportMiddleware = require('./passport');
const express = require('express');
const path = require('path');
module.exports = (app) => {
    usePassportMiddleware(passport);

    app
        .use(passport.initialize())
        .use(passport.session())
        .use(bodyParser.urlencoded({ extended: true }))
        .use(bodyParser.json())
        .use(express.static(path.join(__dirname, '../../../dist')))
        .use('/api/v1', router)
};


require('./passport.js');
