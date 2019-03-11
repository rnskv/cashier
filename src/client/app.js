import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

import Router from './router'
import userStore from './store/user';

import './styles/default.scss';
import { socket } from "./utils";
import { history } from './utils';
import gameStore from "./store/game";

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
            <div className="row">
                <div className="sidebar">
                    <div className="sidebar-menu">
                        <div className="sidebar-menu--item">
                            Classic
                        </div>
                        <div className="sidebar-menu--item sidebar-menu--item__active">
                            FAQ
                        </div>
                        <div className="sidebar-menu--item">
                            Help
                        </div>
                        <div className="sidebar-menu--item">
                            More
                        </div>
                        <div className="sidebar-menu--item">
                            Mocking
                        </div>
                        <div className="sidebar-menu--item">
                            Pages
                        </div>
                        <div className="sidebar-menu--item">
                            For
                        </div>
                        <div className="sidebar-menu--item">
                            Sidebar
                        </div>
                    </div>
                </div>
                <div className="content">
                    <Router />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Main/>, document.getElementById('root')
);