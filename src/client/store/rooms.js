import { computed, observable, action, values } from "mobx";
import { socket } from '../utils';

class RoomsStore {
    @observable roomsMap;
    @observable isLoading;

    constructor() {
        this.roomsMap = {};
        this.isLoading = true;
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
        this.isLoading = false;
        this.roomsMap = data.rooms;
    };

    @action
    onAddRoom = (data) => {
        // this.hello = 'mobX';
        console.log('onAddRoom', data);

        this.roomsMap[data.room.id] = data.room;
    };

    @action
    onRemoveRoom = (data) => {
        // this.hello = 'mobX';
        const { roomId } = data;
        delete this.roomsMap[roomId];
    };

    @action
    onJoinUser = (data) => {
        // this.hello = 'mobX';
        console.log('onJoinUser', data);
        const room = {...this.roomsMap[data.roomId]};
        room.participants.push(data.user);
        this.roomsMap[data.roomId] = room;
    };

    @action
    onLeaveUser = (data) => {
        // this.hello = 'mobX';
        console.log('onLeaveUser')
    };

    @computed
    get rooms() {
        return values(this.roomsMap);
    }

}

export default new RoomsStore()