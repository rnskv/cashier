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

        this.token = localStorage.getItem('token') || null;

        if (this.token) {
            console.log(this.token);
            socket.emit('user.profile', this.token)
        } else {
            this.isLoading = false;
        }

        socket.on('user.login', this.onLogIn);

        socket.on('user.logout', this.onLogOut);

        socket.on('global.error', (data) => {
            console.log('global.error');
            alert(data.message);
            switch (data.type) {
                case 1:
                    localStorage.removeItem("token");
                    window.location = '/login';
                    break;
            }
        });
    }

    @action
    onLogIn = (data) => {
        console.log('user.login');
        this.token = data.token;
        this.profile = data.profile;
        localStorage.setItem("token", data.token);
    };

    @action
    onLogOut = () => {
        this.token = null;
        this.profile = {};

        localStorage.removeItem("token");
    };

    @action
    logOut() {
        console.log('log out');
        socket.emit('user.logout');
    }

    @action
    logInVk() {
        window.location = "http://localhost:1337/api/v1/login/vk"
    }

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