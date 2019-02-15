const request = require('request');

class HttpManager {
    constructor(request) {
        this.client = request;

    }
    request(data) {
        return new Promise((resolve, reject) => {
            console.log('request to:', data.url);
            this.client({
                method: data.method || 'GET',
                url: data.url,
                json: true
            }, (error, response, body) => {
                error ? reject(error) : resolve(body);
            })
        })
    }
}

module.exports = new HttpManager(request);