import React, {Component} from 'react';
import {observer} from 'mobx-react';

import Loader from '../components/Loader';

import {socket} from "../utils";

@observer
class Test extends Component {
    constructor() {
        super();

        this.state = {};
    }

    componentDidMount() {
        socket.on('user.login', function() {
            console.log('user.server.login')
        });
        socket.on('user.connect', function() {
            console.log('user.server.conect')
        });
    }

    logIn() {
        console.log('log in');

        const data = {
            login: 'rnskv',
            password: 'qwerty'
        };

        socket.emit('user.login', data);
    }

    logOut() {
        console.log('log out');
    }

    render() {
        const { store } = this.props;
        return (
            <div>
                <h1>Welcome to test component</h1><hr/>
                Log in user - <button onClick={this.logIn}>Log In</button>
                <br/>
                Log out user - <button onClick={this.logOut}>Log out</button>
            </div>
        )
    }
}

export default Test;