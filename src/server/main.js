const express = require('express');
const mongoose = require('mongoose');

const app = express();

const router = require('./router');
const config = require('./config');

mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@ds131765.mlab.com:31765/cashier`, {useNewUrlParser: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));


app.use('/api/v1', router);

app.listen(1337, function () {
    console.log('Example app listening on port 3000!');
});