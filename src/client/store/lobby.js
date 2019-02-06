import { decorate, observable, action } from "mobx";

class LobbyStore {
    @observable users;

    constructor() {
        this.users = [
                {
                    login: 'mock_rnskv',
                    avatar: 'https://pp.userapi.com/c830400/v830400985/c0fdc/-OcKvSuTwUg.jpg?ava=1',
                    level: 99
                }
            ];
    }

    @action
    addUser = (user) => {
        this.users.push(user)
    };
}

export default new LobbyStore()