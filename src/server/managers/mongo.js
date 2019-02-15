const mongoose = require('mongoose')
;
const config = require('../config');
class MongoManager {
    constructor(mongoose) {
        this.mongoose = mongoose;
        this.init();
    }

    init() {
        this.mongoose.connect(
            `mongodb://${config.db.user}:${config.db.password}@ds131765.mlab.com:31765/cashier`,
            { useNewUrlParser: true }
        );
    }
}

module.exports = new MongoManager(mongoose);