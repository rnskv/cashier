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

    addMiddlewares(middlewares) {
        for (let middleware of middlewares) {
            this.addMiddleware(middleware)
        }
    }

    execute(methodName, params) {
        let routineData = {};
        return async (data) => {
            routineData = {...data, ...params};

            for (let mwId in this.middlewares) {
                // console.log(mwId, data);
                const next = await this.middlewares[mwId](routineData);

                if (!next) {
                    ErrorsHandlers.accessDenied(this.socket)();
                    return;
                }
            }

            try {
                await this.methods[methodName](this.socket)(routineData)
            } catch (error) {
                ErrorsHandlers.sendError(this.socket)(error);
                console.log(`Something went wrong in ${methodName}. Full: ${error}`)
            }
        }
    }
}

module.exports = Handler;