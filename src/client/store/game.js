import { computed, observable, action, values } from "mobx";
import { socket, history } from '../utils';

import userStore from './user';

class Game {
    @observable step;
    @observable time;
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

        socket.on('game.update.state', this.onUpdateState);
        socket.on('game.update.room', this.onUpdateRoom);
        socket.on('game.leave', this.onGameLeave);

        socket.on('game.state', this.onGetState);
        socket.on('game.time', this.onGetTime);

        console.log('construct', socket);
    }

    @action
    getTime = () => {
        console.log('sync client time');
        if (this.room.id) {
            socket.emit('game.time', {token: userStore.session.token, roomId: this.room.id});
        }
    }

    @action
    onGetTime = (data) => {
        console.log('onGetTime', data);
        this.game.time = data.time;
    }

    @action
    onGameLeave = () => {
        history.replace('/')
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
    onUpdateState = (data) => {
        this.game.step = data.game.step;
    };

    @action
    onUpdateRoom = (data) => {
        this.room.id = data.room.id;
        this.room.creator = data.room.creatorId;
        this.room.participants = data.room.participants;
    };

    @action
    nextStep() {
        socket.emit('game.nextStep', {token: userStore.session.token});
    }
}

export default new GameStore()