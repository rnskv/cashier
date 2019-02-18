import { decorate, observable, action } from "mobx";
import { socket } from '../utils';

class RoomsStore {
    @observable rooms;

    constructor() {
        this.rooms = {};

        socket.on('room.add', this.onAddRoom);
        socket.on('room.remove', this.onRemoveRoom);
        socket.on('room.join', this.onJoinUser);
        socket.on('room.leave', this.onLeaveUser);
    }

    @action
    onAddRoom = (data) => {
        // this.hello = 'mobX';
        console.log('onAddRoom')
    };

    @action
    onRemoveRoom = (data) => {
        // this.hello = 'mobX';
        console.log('onRemoveRoom')
    };

    @action
    onJoinUser = (data) => {
        // this.hello = 'mobX';
        console.log('onJoinUser')
    };

    @action
    onLeaveUser = (data) => {
        // this.hello = 'mobX';
        console.log('onLeaveUser')
    }
}

export default new MainStore()