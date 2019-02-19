const request = require('request');

class HttpManager {
    constructor() {
        this.client = request;
        console.log('request')
    }
    request(data) {
        return new Promise((resolve, reject) => {
            console.log('request to:', data.url);
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