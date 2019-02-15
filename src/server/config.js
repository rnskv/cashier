module.exports = {
    client: {
        host: 'http://localhost',
        port: 9000
    },
    db: {
        user: 'root',
        password: 'Qwerty123'
    },
    redis: {
        port: 6379,
        host: '127.0.0.1'
    },
    server: {
        port: 1337,
        startMessage: `-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n`+
                      `Cashier API server was started.\n`+
                      `Created by rnskv - web.rnskv@gmail.com\n`+
                      `-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-`
    }
};