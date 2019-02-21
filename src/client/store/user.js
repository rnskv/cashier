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

    @observable roomId;

    constructor() {
        this.profile = {};
        this.login = '';
        this.password = '';

        this.isLoading = false;

        this.token = localStorage.getItem('token') || null;

        this.roomId = null;

        socket.on('user.getToken', this.onGetToken);
        socket.on('user.roomId', this.onRoomId);
        socket.on('user.joinRoom', this.onJoinRoom);
        socket.on('user.leaveRoom', this.onLeaveRoom);

        socket.on('user.login', this.onLogIn);
        socket.on('user.logout', this.onLogOut);
        socket.on('global.error', (data) => {
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
    onGetToken = (data) => {
        console.log('onGetToken', onGetToken)
    };

    @action
    onRoomId = (data) => {
        console.log('onRoomId', data);
        this.roomId = data.roomId;
    };

    @action
    onJoinRoom = (data) => {
        console.log('onJoinRoom')
    };

    @action
    onLeaveRoom = (data) => {
        console.log('onLeaveRoom')
    };


    @action
    onLogIn = (data) => {
        this.token = data.token;
        this.profile = data.profile;
        this.login = data.profile.login;

        this.loading = false;

        localStorage.setItem("token", data.token);

        socket.emit('rooms.get');
    };

    @action
    onLogOut = () => {
        this.token = null;
        this.profile = {};

        localStorage.removeItem("token");
    };

    @action
    logOut() {
        socket.emit('user.logout');
    }

    @action
    logIn(data) {
        this.loading = true;
        socket.emit('user.login', { token: data.token.split('_').join('.') })
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