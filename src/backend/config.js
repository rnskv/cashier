module.exports = {
    client: {
        host: 'localhost',
        port: 8000,
        protocol: 'http',
    },
    server: {
    host: 'localhost',
        port: 1337,
        protocol: 'http',
        startMessage: `-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n`+
                      `Cashier API server was started.\n`+
                      `Created by rnskv - web.rnskv@gmail.com\n`+
                      `-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-`
    },
    db: {
        user: 'root',
        password: 'Qwerty123'
    },
    redis: {
        port: 6379,
        host: '127.0.0.1'
    },
    jwt: {
        secret: 'supersecretlolitsjoke' //only for dev. On prod will be in .env
    }
};
