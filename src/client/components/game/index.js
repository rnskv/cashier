import { observer } from 'mobx-react';

import React, { Component } from 'react';
import {socket} from "../../utils";
import userStore from "../../store/user";
import gameStore from "../../store/game";

@observer
class Room extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.getState()
    };

    getState() {
        socket.emit('game.state', { roomId: this.props.match.params.id, token: userStore.session.token })
    };

    render() {
        if (gameStore.isLoading) return <div>Get initial game state....</div>;
        return <div>Welcome to the game {this.props.match.params.id} </div>;
    }
}

export default Room;