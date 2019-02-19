import React, { Component } from 'react';
import Room from '../components/Room';
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

    joinRoom = (id) => () => {
        socket.emit('room.join', {roomId: id})
    };

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
                <input type="button" value="Создать комнату" onClick={this.addRoom}/>
                {
                    // roomsStore.rooms.map(room => {
                    //     return <div key={room.id}>Комната ${room.id} <button onClick={this.removeRoom(room.id)} >Remove</button></div>
                    // })
                    roomsStore.rooms.reverse().map(room =>
                         <Room key={room.id}
                               participants={room.participants}
                               join={this.joinRoom(room.id)}
                               remove={this.removeRoom(room.id)}
                         />
                    )
                }
            </div>
        )
    }
}

export default Rooms;