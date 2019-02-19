import { decorate, observable, action } from "mobx";
import { socket } from '../utils';

class RoomsStore {
    @observable rooms;

    constructor() {
        this.rooms = [];
        socket.emit('rooms.get');

        socket.on('rooms.get', this.onGetRooms);
        socket.on('room.add', this.onAddRoom);
        socket.on('room.remove', this.onRemoveRoom);
        socket.on('room.join', this.onJoinUser);
        socket.on('room.leave', this.onLeaveUser);
    }

    @action
    onGetRooms = (data) => {
        console.log('onGetRooms', data);
        this.rooms = data.rooms;
    }

    @action
    onAddRoom = (data) => {
        // this.hello = 'mobX';
        console.log('onAddRoom', data);

        this.rooms.push(data.room)

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

export default new RoomsStore()