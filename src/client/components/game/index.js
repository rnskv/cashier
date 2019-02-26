import { observer } from 'mobx-react';

import React, { Component } from 'react';
import {socket} from "../../utils";
import userStore from "../../store/user";
import gameStore from "../../store/game";

@observer
class Room extends Component {
    constructor(props) {
        super();
        socket.on('user.login', () => {
            this.getState()
        });
    }

    componentDidMount() {
        this.getState()
    };

    getState = () =>  {
        socket.emit('game.state', { roomId: this.props.match.params.id, token: userStore.session.token })
    };

    render() {
        console.log(gameStore);
        if (gameStore.isLoading) return <div>Get initial game state....</div>;
        return <div>
            <h1>Welcome to the game {this.props.match.params.id}</h1>
            <table>
                <tbody>
                    <tr>
                        <td>
                            id
                        </td>
                        <td>
                            { gameStore.room.id }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Creator
                        </td>
                        <td>
                            { gameStore.room.creator }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Participants
                        </td>
                        <td>
                            { gameStore.room.participants && gameStore.room.participants.map(participant => participant.name) }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Step
                        </td>
                        <td>
                            { gameStore.game.step }
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={gameStore.nextStep}>Следующий шаг</button>
        </div>;
    }
}

export default Room;