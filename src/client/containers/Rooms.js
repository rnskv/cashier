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

    render() {
        const { data } = this.props;

        return (
            <div>
                {
                    roomsStore.rooms.map(room => {
                        return <div key={room.id}>Комната ${room.id}</div>
                    })
                }
                <input type="button" value="Create" onClick={this.addRoom}/>
            </div>
        )
    }
}

export default Rooms;