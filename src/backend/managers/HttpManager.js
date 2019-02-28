const request = require('request');

class HttpManager {
    constructor() {
        this.client = request;
    }
    request(data) {
        return new Promise((resolve, reject) => {
            this.client({
                method: data.method || 'GET',
                url: data.url,
                body: data.body || {},
                json: true
            }, (error, response, body) => {
                error ? reject(error) : resolve(body);
            })
        })
    }
}

module.exports = HttpManager;