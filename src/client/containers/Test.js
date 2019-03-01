import React, {Component} from 'react';
import {observer} from 'mobx-react';
import { Redirect } from 'react-router-dom';

import Loader from '../components/Loader';

import {socket} from "../utils";

@observer
class Test extends Component {
    constructor(props) {
        super();
        this.state = {
            token: null,
            profile: {},
            users: [],
        };
    }

    componentDidMount() {
        socket.on('user.login', (data) => {
            this.setState({
                token: data.token,
                profile: data.profile
            });
            localStorage.setItem("token", data.token);
        });

        socket.on('user.logout', (data) => {
            this.setState({
                token: null,
                profile: {},
                users: []
            });
            localStorage.removeItem("token")
        });

        socket.on('user.connect', (data) => {
            this.setState({
                users: data.users
            })
        });

        socket.on('user.disconnect', (data) => {
            this.setState({
                users: data.users
            })
        });

        socket.on('test', (data) => {
            alert('test')
        });

        socket.on('global.error', (data) => {
            alert(data.message);
            switch (data.type) {
                case 1:
                    window.location = '/test';
                    localStorage.removeItem("token");
                    break;
            }
        });

        if (localStorage.getItem("token") || this.props.match.params.token) {
            const data = {
                token: localStorage.getItem("token") || this.props.match.params.token,
            };
            socket.emit('user.login', data);
        }
    }

    logIn() {
        const data = {
            login: 'rnskv',
            password: 'qwerty'
        };

        socket.emit('user.login', data);
    }

    logOut() {
        socket.emit('user.logout');
    }

    logInVk() {
        window.location = "http://"+config.server.host+":1337/api/v1/login/vk"
    }

    render() {
        const { store } = this.props;

        return (
            <div>
                {
                    this.state.token
                        ? <React.Fragment><h1>Welcome, {this.state.profile.name} <img src={this.state.profile.avatar}/> ,</h1> your token: {this.state.token}</React.Fragment>
                        : <h1>Welcome to test component</h1>
                }
                <hr/>
                Log in by vk.com - <button onClick={this.logInVk}>Log In</button>
                <br/>
                Log in user - <button onClick={this.logIn}>Log In</button>
                <br/>
                Log out user - <button onClick={this.logOut}>Log out</button>
                <hr/>
                {
                    this.state.users.map((user, index) => {
                        return (
                            <div key={index}>{user.login} - <img src={this.state.profile.avatar} /></div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Test;