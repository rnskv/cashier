import { computed, observable, action, values } from "mobx";
import { socket, history } from '../utils';

class RoomsStore {
    @observable roomsMap;
    @observable isLoading;

    constructor() {
        this.roomsMap = new Map();

        this.isLoading = true;

        socket.on('rooms.get', this.onGetRooms);
        socket.on('room.add', this.onAddRoom);
        socket.on('room.remove', this.onRemoveRoom);
        socket.on('room.join', this.onJoinUser);
        socket.on('room.leave', this.onLeaveUser);

        socket.on('game.start', this.onStartGame);
        socket.on('game.connect', this.onConnectGame);

        socket.on('error', () => {
            alert('error')
        });

    }

    @action
    onGetRooms = (data) => {
        console.log('onGetRooms', data);
        this.isLoading = false;

        this.roomsMap = new Map();

        Object.values(data.rooms).forEach(room => {
            this.roomsMap.set(room.id, room);
        });
    };

    @action
    onAddRoom = (data) => {
        this.roomsMap.set(data.room.id, data.room);
    };

    @action
    onRemoveRoom = (data) => {
        const { roomId } = data;
        this.roomsMap.delete(roomId);
    };

    @action
    onJoinUser = (data) => {
        console.log('onJoinUser', data.roomId, data.position);
        this.roomsMap.get(data.roomId).participants[+data.position] = data.user;
    };

    @action
    onLeaveUser = (data) => {
        const room = this.roomsMap.get(data.roomId);
        console.log(data.position)
        if (room.participants) {
            room.participants[data.position] = null;
        }
    };

    @action
    onStartGame = (data) => {
        console.log('onStart');
        history.replace('/game/' + data.roomId)
    };

    @action
    onConnectGame = (data) => {
        history.replace('/game/' + data.roomId)
    };

    @computed
    get rooms() {
        return values(this.roomsMap).reverse();
    }

}

export default new RoomsStore()