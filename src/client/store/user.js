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

    @action
    setRoomId(roomId) {
        this.roomId = roomId;
    }

    reset() {
        this.roomId = null;
        this.token = null;
    }
}

class UserStore {
    @observable isLoading;


    @observable profile;
    @observable session;

    constructor() {
        this.profile = new Profile();
        this.session = new Session();

        this.isLoading = false;

        socket.on('user.joinRoom', this.onJoinRoom);
        socket.on('user.leaveRoom', this.onLeaveRoom);

        socket.on('user.login', this.onLogIn);
        socket.on('user.logout', this.onLogOut);

        socket.on('user.profile', this.onGetProfile);
        socket.on('user.roomId', this.onGetRoomId);
    }

    @action
    onGetRoomId = (data) => {
        this.session.roomId = data.roomId;
    };


    @action
    getProfile(data) {
        socket.emit('user.profile', { data, token: this.session.token });
    }

    @action
    onGetProfile = (data) => {
        this.profile.avatar = data.profile.avatar;
        this.profile.name = data.profile.name;
        this.profile.uid = data.profile.uid;
        this.profile.id = data.profile.id;

        this.session.token = data.session.token;
        this.session.roomId = data.session.roomId;
        // socket.emit('rooms.get');
        socket.emit('rooms.get', { token: this.session.token});

    };

    @action
    onJoinRoom = (data) => {

    };

    @action
    onLeaveRoom = (data) => {

    };


    @action
    onLogIn = (data) => {
        localStorage.setItem("token", data.token);
        this.session.token = data.token;
        this.getProfile(data);

    };

    @action
    onLogOut = () => {
        this.token = null;

        this.session.reset();

        localStorage.removeItem("token");
    };

    @action
    logOut() {
        socket.emit('user.logout');
    }

    @action
    logIn(data) {
        this.loading = true;
        socket.emit('user.login', { token: data.token.split('*').join('.') })
    }

    @action
    logInVk() {
        window.location = process.env.BACKEND_URL + ':' + process.env.BACKEND_PORT + "/api/v1/login/vk"
    }
}

export default new UserStore()