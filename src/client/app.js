import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

import Router from './router'
import userStore from './store/user';

import './styles/default.scss';
import { socket } from "./utils";
import { history } from './utils';
import gameStore from "./store/game";
import UserBarContainer from './containers/UserBar';
@observer
class Main extends Component {
    constructor(props) {
        super();
        socket.on('test', (data) => {
            alert('test');
        });

        const data = {
            token: localStorage.getItem("token"),
        };

        if (data.token) {
            userStore.logIn(data);
        }

        socket.on('global.error', (data) => {
            alert(data.message);

            switch (data.type) {
                case 1:
                    localStorage.removeItem("token");
                    window.location = '/login';
                    break;
            }
        });

        socket.on('disconnect', (socket) => {
            console.log('Handled disconnect');
        });

        socket.on('reconnect', () => {
            console.log('Handled reconnect');
            // alert('Проблема с соединением, страница будет обновлена');
            // window.location = '/';
            socket.emit('user.login', { token: userStore.session.token });
        })
    }

    render() {
        return (
            <div>
                <div className="header">
                    <UserBarContainer store={userStore}/>
                    {/*<LobbyContainer userStore={userStore} store={lobbyStore}/>*/}
                </div>
                <div className="row">
                    <div className="sidebar">
                        <div className="sidebar-menu">
                            <div className="sidebar-menu__group sidebar-menu__group--violet">
                                <div className="sidebar-menu--item">
                                    <div className="sidebar-menu--item-name">Classic</div>
                                    <div className="sidebar-menu--item-description">Your first money</div>
                                </div>
                                <div className="sidebar-menu--item sidebar-menu--item__active">
                                    <div className="sidebar-menu--item-name">FAQ</div>
                                    <div className="sidebar-menu--item-description">All your questions</div>
                                </div>
                                <div className="sidebar-menu--item">
                                    <div className="sidebar-menu--item-name">Help</div>
                                    <div className="sidebar-menu--item-description">Best support</div>
                                </div>
                            </div>
                            <div className="sidebar-menu__group sidebar-menu__group--blue">
                                <div className="sidebar-menu--item">
                                    <div className="sidebar-menu--item-name">Mock</div>
                                    <div className="sidebar-menu--item-description">For example</div>
                                </div>
                                <div className="sidebar-menu--item">
                                    <div className="sidebar-menu--item-name">Pages</div>
                                    <div className="sidebar-menu--item-description">It's news or not</div>
                                </div>
                            </div>
                            <div className="sidebar-menu__group sidebar-menu__group--green">
                                <div className="sidebar-menu--item">
                                    <div className="sidebar-menu--item-name">Example</div>
                                    <div className="sidebar-menu--item-description">For green group</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <Router />
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Main/>, document.getElementById('root')
);