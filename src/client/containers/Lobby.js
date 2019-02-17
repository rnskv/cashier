import React, {Component} from 'react';
import {observer} from 'mobx-react';

import Loader from '../components/Loader';
import LobbyUser from '../components/LobbyUser';

import userStore from '../store/user';
import { socket } from '../utils';
import lobby from "../store/lobby";

@observer
class Lobby extends Component {
    constructor(props) {
        super();
        socket.on('lobby.users', props.store.updateUsers);
    }

    componentWillUnmount() {
        socket.emit('lobby.leave', userStore.token);
    }
    componentDidMount() {
        socket.emit('lobby.join', userStore.token);
    }
    render() {
        const { store } = this.props;
        return (
            <div className="lobby" >
                <h1 className="title title--white">Сейчас онлайн:</h1>
                <div className="lobby-users">
                    {
                        store.users.map((user, id) => <LobbyUser key={id} data={user}/>)
                    }
                </div>
            </div>
        )
    }
}

export default Lobby;