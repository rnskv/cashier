const mongoose = require('mongoose');

class MongoManager {
    constructor() {
        this.mongoose = mongoose;
    }

    init() {
        this.mongoose.connect(
            `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds131765.mlab.com:31765/cashier`,
            { useNewUrlParser: true }
        );
    }
    connect() {
        this.init();
    }
}

module.exports = MongoManager;