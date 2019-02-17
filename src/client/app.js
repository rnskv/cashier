import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

import Router from './router'
import userStore from './store/user';

import './styles/default.scss';
import {socket} from "./utils";

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

    }

    render() {
        return (
            <div className="wrapper">
                <Router/>
            </div>
        )
    }
}

ReactDOM.render(
    <Main/>, document.getElementById('root')
);