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
                result.push(token);
            }
        });
        return result;
    }

    update(key, value) {
        this.set(key, {...this.get(key) || {}, ...value});
    }

    modify(key, fn) {
        const value = this.get(key);
        const newValue = fn({...value});
        this.set(key, newValue)
    }
}

module.exports = Store;