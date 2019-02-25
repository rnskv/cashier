class Store {
    constructor() {
        this.state = new Map();
    }

    get(key) {
        return this.state.get(key)
    }

    set(key, value) {
        this.state.set(key, value);
    }

    delete(key) {
        this.state.delete(key);
    }

    getUserSockets(id) {
        const result = [];
        this.state.forEach((user, token) => {
            if (user.id === id) {
                console.log('Нашел сокет юзера');
                result.push(token);
            }
        });
        return result;
    }

}

module.exports = Store;