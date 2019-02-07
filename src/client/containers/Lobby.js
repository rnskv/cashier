import React, {Component} from 'react';
import {observer} from 'mobx-react';

import Loader from '../components/Loader';
import LobbyUser from '../components/LobbyUser';

import { socket } from '../utils.js';

@observer
class Lobby extends Component {
    render() {
        const { store, userStore } = this.props;

        return (
            <div className="lobby" >
                <h1 className="title title--white">Сейчас онлайн:</h1>
                {
                    userStore.isLoading
                        ? <Loader />
                        : <div className="lobby-users">
                            {
                                store.users.map((user, id) => <LobbyUser key={id} data={user}/>)
                            }
                        </div>
                }
            </div>
        )
    }
}

export default Lobby;