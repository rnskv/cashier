import React, { Component } from 'react';
import Room from '../components/room';
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

    startGame = (id) => () => {
        socket.emit('game.start', { token: userStore.token, roomId: id })
    };

    joinRoom = (id) => () => {
        socket.emit('room.join', { token: userStore.token, roomId: id })
    };

    leaveRoom = (id) => () => {
        socket.emit('room.leave', { token: userStore.token, roomId: id})
    };

    addRoom() {
        socket.emit('room.add', { token: userStore.token })
    }

    removeRoom = (id) => () => {
        socket.emit('room.remove', { token: userStore.token, id })
    };

    render() {
        const { data } = this.props;
        if (roomsStore.isLoading) return <div>Комнаты загружаются</div>
        return (
            <React.Fragment>
                <input type="button" value="Создать комнату" onClick={this.addRoom}/>
                <div className="rooms">
                    {
                        // roomsStore.rooms.map(room => {
                        //     return <div key={room.id}>Комната ${room.id} <button onClick={this.removeRoom(room.id)} >Remove</button></div>
                        // })
                        roomsStore.rooms.reverse().map(room =>
                            <Room key={room.id}
                                  isUserRoom={room.id === userStore.roomId}
                                  isUserCreator={room.creator === userStore.profile._id}
                                  creator={room.creator}
                                  participants={room.participants}
                                  startGame={this.startGame(room.id)}
                                  userJoin={this.joinRoom(room.id)}
                                  userLeave={this.leaveRoom(room.id)}
                                  removeRoom={this.removeRoom(room.id)}
                            />
                        )
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Rooms;