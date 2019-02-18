import React, { Component } from 'react';
import { socket } from '../utils';
import userStore from '../store/user';

class Room extends Component {
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
            <div className="lobby-room">
                <input type="button" value="Create" onClick={this.addRoom}/>
                <div>Игрок 1</div>
                <div>Игрок 2</div>
                <div>Игрок 3</div>
                <div>Игрок 4</div>
                <input type="button" value="Join" onClick={this.joinRoom}/>
            </div>
        )
    }
}

export default Room;