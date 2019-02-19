import React, { Component } from 'react';
import { socket } from '../utils';
import userStore from '../store/user';
import roomsStore from '../store/rooms';
import { observer } from 'mobx-react';

@observer
class Rooms extends Component {
    constructor() {
        super();
    }

    componentDidMount() {

    }

    joinRoom() {
        socket.emit('room.join', {token: userStore.token, roomId: 0})
    }

    addRoom() {
        socket.emit('room.add', { token: userStore.token })
    }

    removeRoom = (id) => () => {
        console.log('Send request for delete room_'+id);
        socket.emit('room.remove', { token: userStore.token, id })
    };

    render() {
        const { data } = this.props;
        if (roomsStore.isLoading) return <div>Комнаты загружаются</div>
        return (
            <div>
                {
                    roomsStore.rooms.map(room => {
                        return <div key={room.id}>Комната ${room.id} <button onClick={this.removeRoom(room.id)} >Remove</button></div>
                    })
                }
                <input type="button" value="Create" onClick={this.addRoom}/>
            </div>
        )
    }
}

export default Rooms;