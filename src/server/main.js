const express = require('express');
const path = require('path');
const fallback = require('express-history-api-fallback');

const app = express();

app.use(express.static(__dirname + '/../../dist'));

app.use('/partials', express.static(__dirname + '/partials'));
app.use(fallback('index.html', { root: __dirname + '../../../dist'}));

app.listen(8000, function () {
    console.log('start');
});