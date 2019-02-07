import { decorate, observable, action } from "mobx";

class MainStore {
    @observable login;
    @observable password;
    @observable avatar;
    @observable level;
    @observable actions;

    @observable isLoading;
    @observable isAuth;
    @observable token;

    constructor() {
        this.login = '';
        this.password = '';
        this.avatar = '';
        this.level = 1;
        this.actions = '';
        this.isLoading = true;
        this.isAuth = false;
        this.token = localStorage.getItem('userToken') || '';

        if (this.token) {
            this.isAuth = true;
            this.getUserData();
        }
    }

    @action
    logIn = (login, password) => {
        this.login = login;
        this.password = password;
        //Мок запроса на сервер
        this.isLoading = true;
        console.log(this.isLoading);
        setTimeout(() => {
            this.isLoading = false;
            this.isAuth = true;
            this.token = '123213';

            localStorage.setItem('userToken', this.token);

        }, 3000)
    };

    @action
    logOut = () => {
        this.isLoading = false;
        this.isAuth = false;
        this.token = '';
        localStorage.removeItem('userToken');
    };

    @action
    getUserData = () => {
        this.isLoading = true;

        setTimeout(() => {
            this.login = 'mock_rnskv';
            this.level = 99;
            this.avatar = 'https://cs8.pikabu.ru/post_img/big/2016/07/09/7/1468062365176514879.jpg';

            this.isLoading = false;
        }, 1000)
    };

    @action
    updateUserData = (data) => {
        this.isLoading = false;
        console.log('UserData', data)
    }

}

export default new MainStore()