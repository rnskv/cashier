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

        socket.emit('game.init', this.onInit);
        socket.on('game.init', this.onInit)
    }

    onInit = (data) => {
        console.log('onInitGame', data);
    }
}

export default new GameStore()