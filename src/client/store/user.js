import { decorate, observable, action } from "mobx";

class MainStore {
    @observable login;
    @observable password;
    @observable avatar;
    @observable level;
    @observable actions;

    @observable isLoading;
    @observable isAuth;

    constructor() {
        this.login = '';
        this.password = '';
        this.avatar = '';
        this.level = 1;
        this.actions = '';
        this.isLoading = false;
        this.isAuth = false;
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
        }, 3000)
    };

    @action
    logOut = () => {
        this.isLoading = false;
        this.isAuth = false;
    }
}

export default new MainStore()