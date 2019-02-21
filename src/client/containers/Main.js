import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';

import mainStore from '../store/main';
import userStore from '../store/user';
import lobbyStore from '../store/lobby';

import UserBarContainer from '../containers/UserBar';
import LobbyContainer from '../containers/Lobby';
import RoomsContainer from '../containers/Rooms';
import { socket } from '../utils.js';

@observer
class Main extends Component {
    constructor() {
        super();
        this.store = mainStore;
        socket.on('user.error', function(data) {
            switch (data.type) {
                case 'AUTH_ERROR':
                    userStore.logOut();
                    break;
            }
            alert('Error:' + data.message)
        })

    }

    componentWillUnmount() {/* some code will be there */}

    render() {
        if (!userStore.token) {
            return <Redirect to={'/login'} />
        }

        return (
            <React.Fragment>
                <div className="header">
                    <UserBarContainer store={userStore}/>
                    {/*<LobbyContainer userStore={userStore} store={lobbyStore}/>*/}
                </div>
                <RoomsContainer/>
            </React.Fragment>
        )
    }
}

export default Main;