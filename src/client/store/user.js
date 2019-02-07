import { decorate, observable, action } from "mobx";
import { socket } from '../utils';

class MainStore {
    @observable login;
    @observable password;
    @observable avatar;
    @observable level;
    @observable actions;

    @observable isLoading;
    @observable token;

    constructor() {
        this.profile = {};
        this.login = '';
        this.password = '';

        this.isLoading = true;

        this.token = localStorage.getItem('userToken') || null;

        if (this.token) {
            console.log(this.token);
            socket.emit('user.profile', this.token)
        } else {
            this.isLoading = false;
        }

        socket.on('user.token', this.setToken);
        socket.on('user.profile', this.setProfile);
    }

    @action
    logIn = (login, password) => {
        this.login = login;
        this.password = password;

        this.isLoading = true;

        const user = {
            login,
            password
        };

        socket.emit('user.login', user)
    };

    @action
    logOut = () => {
        this.isLoading = false;
        this.token = '';
        localStorage.removeItem('userToken');
    };

    @action
    setToken = (token) => {
        this.token = token;
        localStorage.setItem('userToken', token);
    };

    @action
    setProfile = (profile) => {
        this.profile = profile;
        this.isLoading = false;
    }
}

export default new MainStore()