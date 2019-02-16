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

        this.isLoading = false;

        this.token = localStorage.getItem('token') || null;


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
        this.loading = false;
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
    logIn(data) {
        this.loading = true;
        socket.emit('user.login', { token: data.token })
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