import { computed, observable, action, values } from "mobx";
import { socket, history } from '../utils';

class RoomsStore {
    @observable roomsMap;
    @observable isLoading;

    constructor() {
        this.roomsMap = {};

        this.isLoading = true;

        socket.on('rooms.get', this.onGetRooms);
        socket.on('room.add', this.onAddRoom);
        socket.on('room.remove', this.onRemoveRoom);
        socket.on('room.join', this.onJoinUser);
        socket.on('room.leave', this.onLeaveUser);

        socket.on('game.start', this.onStartGame);

        socket.on('error', () => {
            alert('error')
        });

    }

    @action
    onGetRooms = (data) => {
        this.isLoading = false;
        this.roomsMap = data.rooms;
    };

    @action
    onAddRoom = (data) => {
        // this.hello = 'mobX';
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
        this.roomsMap[data.roomId].participants[data.position] = data.user;
        console.log('ощшт гыук сщьздуеу');
    };

    @action
    onLeaveUser = (data) => {
        const room = {...this.roomsMap[data.roomId]};
        console.log('leave', data);
        if (room.participants) {
            room.participants[data.position] = null;
        }
    };

    @action
    onStartGame = (data) => {
        history.replace('/game/' + data.roomId)
    };


    @computed
    get rooms() {
        return values(this.roomsMap);
    }

}

export default new RoomsStore()