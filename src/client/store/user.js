import { decorate, observable, action } from "mobx";
import { socket } from '../utils';

class Profile {
    @observable uid = null;
    @observable name = null;
    @observable avatar = null;
}

class Session {
    @observable roomId = null;
    @observable token = localStorage.getItem('token') || null;
}

class UserStore {
    @observable isLoading;


    @observable profile;

    constructor() {
        this.profile = new Profile();
        this.session = new Session();

        this.isLoading = false;

        socket.on('user.joinRoom', this.onJoinRoom);
        socket.on('user.leaveRoom', this.onLeaveRoom);

        socket.on('user.login', this.onLogIn);
        socket.on('user.logout', this.onLogOut);

        socket.on('user.profile', this.onGetProfile);

    }

    @action
    getProfile(data) {
        socket.emit('user.profile', { data });
    }

    @action
    onGetProfile = (data) => {
        console.log('onGetProfile', data);
        this.profile.avatar = data.profile.avatar;
        this.profile.name = data.profile.name;
        this.profile.uid = data.profile.uid;
        this.profile.id = data.profile.id;

        this.session.token = data.session.token;
        this.session.roomId = data.session.roomId;
        socket.emit('rooms.get');
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
        localStorage.setItem("token", data.token);
        console.log(data)
        this.getProfile(data);
    };

    @action
    onLogOut = () => {
        this.token = null;

        this.profile = null;
        this.session.token = null;

        localStorage.removeItem("token");
    };

    @action
    logOut() {
        socket.emit('user.logout');
    }

    @action
    logIn(data) {
        console.log('logIn', data);
        this.loading = true;
        socket.emit('user.login', { token: data.token.split('*').join('.') })
    }

    @action
    logInVk() {
        window.location = "http://localhost:1337/api/v1/login/vk"
    }
}

export default new UserStore()