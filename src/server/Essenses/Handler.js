const ErrorsHandlers = require('../handlers/ErrorsHandlers');

class Handler {
    constructor() {
        this.methods = {};
        this.socket = null;
        this.middlewares = [];
    }

    setMethods(methods) {
        this.methods = methods;
    }

    setSocket(socket) {
        this.socket = socket;
    }

    addMiddleware(fn) {
        this.middlewares.push(fn);
    }

    execute(methodName, params) {
        let routineData = {};
        return async (data) => {
            routineData = {...data, ...params};

            for (let mwId in this.middlewares) {

                const next = await this.middlewares[mwId](routineData);

                if (!next) {
                    ErrorsHandlers.accessDenied(this.socket)({message: 'accessDenied'});
                    return;
                }
            }

            this.methods[methodName](this.socket)(routineData);
        }
    }
}

module.exports = Handler;