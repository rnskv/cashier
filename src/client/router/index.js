import React from 'react';

import { Router, Route, Link } from 'react-router-dom'
import Routes from './routes';
import { history } from "../utils";
import userStore from "../store/user";
import UserBarContainer from '../containers/UserBar';
import Sidebar from '../components/sidebar';

export default () => (
    <Router history={history}>
        <React.Fragment>
            <div className="header">
                <UserBarContainer store={userStore}/>
                {/*<LobbyContainer userStore={userStore} store={lobbyStore}/>*/}
            </div>
            <div className="row">
                <Sidebar />
                <div className="content">
                    <Routes />
                </div>
            </div>
        </React.Fragment>
    </Router>
)
