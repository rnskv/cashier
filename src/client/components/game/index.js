import React, { Component } from 'react';
import {socket} from "../../utils";
import userStore from "../../store/user";

class Room extends Component {
    constructor() {
        super();
        this.state = {
            isShowInstructions: false
        }
    }

    gameInit = (id) => () => {
        socket.emit('room.join', { token: userStore.token, roomId: id })
    };

    render() {
        return <div>Welcome to the game</div>
    }
}

export default Room;