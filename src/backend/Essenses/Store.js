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
                // console.log('Нашел сокет юзера');
                result.push(token);
            }
        });
        return result;
    }

    update(key, value) {
        // console.log('update', value);
        // console.log('update old',key, this.get(key));
        this.set(key, {...this.get(key) || {}, ...value});
        // console.log('Update store to from', this.get(key), {...this.get(key) || {}, ...value} )
    }

    modify(key, fn) {
        const value = this.get(key);
        const newValue = fn({...value});
        // console.log('Модифицирую стор,', key, newValue);
        this.set(key, newValue)
    }
}

module.exports = Store;