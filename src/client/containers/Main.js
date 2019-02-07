import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';

import mainStore from '../store/main';
import userStore from '../store/user';
import lobbyStore from '../store/lobby';

import UserBarContainer from '../containers/UserBar';
import LobbyContainer from '../containers/Lobby';

import { socket } from '../utils.js';

@observer
class Main extends Component {
    constructor() {
        super();
        this.store = mainStore;
        setTimeout(() => {
            this.store.setHello();
        }, 3000);
        socket.emit('hello', {message: 'world'})
    }

    componentWillUnmount() {
        socket.emit('goodby', {message: 'world'})
    }

    render() {

        if (!userStore.token) {
            return <Redirect to={'/login'} />
        }

        return (
            <React.Fragment>
                <div className="header">
                    <div className="manu_mock">Меню</div>
                    <UserBarContainer store={userStore}/>
                </div>

                <LobbyContainer store={lobbyStore}/>
            </React.Fragment>
        )
    }
}

export default Main;