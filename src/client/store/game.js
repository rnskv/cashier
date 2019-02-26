import { computed, observable, action, values } from "mobx";
import { socket } from '../utils';

class GameStore {
    @observable roomId;
    @observable isLoading;
    @observable currentStep;

    constructor() {
        this.roomId = null;
        this.isLoading = true;
        this.currentStep = 0;

        socket.on('game.state', this.onGetState);

        console.log('construct')
    }

    onGetState = (data) => {
        console.log('try get state', data);
        this.isLoading = false;
    };
}

export default new GameStore()