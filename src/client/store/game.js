import { computed, observable, action, values } from "mobx";
import { socket } from '../utils';

import userStore from './user';

class Game {
    @observable step;
}

class Room {
    @observable creator;
    @observable id;
    @observable participants;
}

class GameStore {
    @observable room;
    @observable game;
    @observable isLoading;

    constructor() {
        this.room = new Room();
        this.game = new Game();
        this.isLoading = true;
        socket.on('game.state', this.onGetState);
        socket.on('game.update', this.onUpdateGame);


        console.log('construct')
    }

    @action
    onGetState = (data) => {
        console.log('try get state', data);

        this.room.id = data.room.id;
        this.room.creator = data.room.creatorId;
        this.room.participants = data.room.participants;

        this.game.step = data.game.step;

        this.isLoading = false;
    };

    @action
    onUpdateGame = (data) => {
        this.game.step = data.game.step;
    };

    @action
    nextStep() {
        socket.emit('game.nextStep', {token: userStore.session.token});
    }
}

export default new GameStore()