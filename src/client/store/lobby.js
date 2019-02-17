import { decorate, observable, action } from "mobx";
import { socket } from '../utils';

class LobbyStore {
    @observable users;

    constructor() {
        this.users = [];

        socket.on('user.connect', this.onUserConnect);
        socket.on('user.disconnect', this.onUserDisconnect)
    }

    @action
    onUserConnect = (data) => {
        this.users = data.users;
    };
    @action
    onUserDisconnect = (data) => {
        this.users = data.users;
    };

    @action
    addUser = (user) => {
        this.users.push(user);
    };

    @action
    removeUser = (id) => {
        this.users = this.users.filter(user => user.id !== id)
    };

    @action
    updateUsers = (users) => {
        this.users = users;
    }
}

export default new LobbyStore()