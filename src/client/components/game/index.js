import { observer } from 'mobx-react';

import React, { Component } from 'react';
import { socket } from "../../utils";

import userStore from "../../store/user";
import gameStore from "../../store/game";

@observer
class Room extends Component {
    constructor(props) {
        super();
        socket.on('user.login', () => {
            // this.getState()
        });
        // this.timer = setInterval(gameStore.getTime, 1000);
    }

    componentDidMount() {
        this.getState()
    };

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    getState = () =>  {
        socket.emit('game.state', { roomId: this.props.match.params.id, token: userStore.session.token })
    };

    render() {
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
                            Step
                        </td>
                        <td>
                            { gameStore.game.step } - { gameStore.game.time / 1000} сек
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={gameStore.nextStep}>Следующий шаг</button>
        </div>;
    }
}

export default Room;