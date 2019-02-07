import { decorate, observable, action } from "mobx";
import { socket } from '../utils';

class LobbyStore {
    @observable users;

    constructor() {
        this.users = [];
    }

    @action
    addUser = (user) => {
        this.users.push(user);
    };

    @action
    removeUser = (id) => {
        console.log('removeUser', id);
        this.users = this.users.filter(user => user.id !== id)
    };

    @action
    updateUsers = (users) => {
        this.users = users;
    }
}

export default new LobbyStore()