const Redis = require('ioredis');
const redis = new Redis();


class RedisManager {
    constructor(Redis) {
        this.Redis = Redis;
        this.redis = null;

        this.init();
        this.subscribtions();
    }

    init() {
        this.redis = new this.Redis();
    }

    subscribtions() {
        this.redis.on("error", function (err) {
            console.log("Error " + err);
        });
    }

    set(key, value) {
        this.redis.set(key, value);
    }

    get(key) {
        return this.redis.get(key)
    }

    sadd(key, data) {
        this.redis.sadd(key, ...data)
    }

    srem(key, data) {
        this.redis.srem(key, data)
    }

    smembers(key) {
        return this.redis.smembers(key)
    }
}

module.exports = new RedisManager(Redis);