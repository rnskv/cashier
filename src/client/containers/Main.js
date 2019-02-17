import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router';
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

        socket.on('user.error', function(data) {
            console.log(data)
            switch (data.type) {
                case 'AUTH_ERROR':
                    userStore.logOut();
                    break;
            }
            alert('Error:' + data.message)
        })

    }

    componentWillUnmount() {
    }
    componentDidUpdate() {
        const { store } = this.props;
        const data = {
            token: localStorage.getItem("token") || this.props.match.params.token,
        };

        if (data.token) {
            store.logIn(data);
        }
    }
    render() {
        console.log('My', userStore.profile)
        if (!userStore.token) {
            return <Redirect to={'/login'} />
        }

        return (
            <React.Fragment>
                <div className="header">
                    <div className="manu_mock">Меню</div>
                    <UserBarContainer store={userStore}/>
                </div>

                <LobbyContainer userStore={userStore} store={lobbyStore}/>
            </React.Fragment>
        )
    }
}

export default Main;