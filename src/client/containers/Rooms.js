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
        // alert('mount')
        socket.emit('rooms.get');
    }

    startGame = (id) => () => {
        socket.emit('game.start', { token: userStore.session.token, roomId: id })
    };

    joinRoom = (id) => () => {
        socket.emit('room.join', { token: userStore.session.token, roomId: id })
    };

    leaveRoom = (id) => () => {
        socket.emit('room.leave', { token: userStore.session.token, roomId: id})
    };

    addRoom = () => {
        socket.emit('room.add', { token: userStore.session.token })
    }

    removeRoom = (id) => () => {
        socket.emit('room.remove', { token: userStore.session.token, id })
    };
    connectGame = (id) => () => {
        socket.emit('game.connect', { token: userStore.session.token, roomId: id })
    };

    render() {
        const { data } = this.props;
        if (roomsStore.isLoading) return <div>Комнаты загружаются</div>;

        return (
            <div className="section">
                <div className="block">
                    <h1 className="title title--section">Rooms</h1>
                    <div className="split">
                        <p className="description description--rooms">
                            Join an existing room or create your own. When creating you can choose the game,
                            the type of room, the number of participants as well as the progress of each player.
                            Create a room, invite friends. Together get the opportunity to be in the game, play and win!
                        </p>
                        <div className="column">
                            <input type="button" className="button button--room" value="Create room" onClick={this.addRoom}/>
                            <input type="button" className="button button--room" value="Join room" onClick={this.addRoom}/>
                        </div>
                    </div>
                </div>

                <div className="rooms">
                    {
                        roomsStore.rooms.map(room => {
                                { console.log(room) }
                            return (
                                <Room key={room.id}
                                     isUserRoom={room.id === userStore.session.roomId}
                                     isUserCreator={room.creator.id === userStore.profile.id}
                                     isStarted={room.isStarted}
                                     creator={room.creator}
                                     participants={room.participants}
                                     startGame={this.startGame(room.id)}
                                     userJoin={this.joinRoom(room.id)}
                                     userLeave={this.leaveRoom(room.id)}
                                     removeRoom={this.removeRoom(room.id)}
                                     connectGame={this.connectGame(room.id)}
                                />
                            )
                        }
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Rooms;