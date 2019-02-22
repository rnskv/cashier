const ErrorsHandlers = require('../handlers/ErrorsHandlers');

class Handler {
    constructor() {
        this.methods = {};
        this.handlers = {};

        this.middlewares = [];
    }

    setMethods(methods) {
        this.methods = methods;
    }

    setSocket(socket) {
        Object.keys(this.methods).forEach(methodName => {
            this.handlers[methodName] = this.methods[methodName](socket)
        })
    }

    addMiddleware(fn) {
        this.middlewares.push(fn);
    }

    execute(methodName, accessLevel) {
        return (data) => {

            for (let mwId in this.middlewares) {

                const next = this.middlewares[mwId](data);

                if (!next) return;
            }

            this.handlers[methodName](data);
        }
    }
}

module.exports = Handler;