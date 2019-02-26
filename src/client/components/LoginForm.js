import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { observer } from 'mobx-react';
import {socket} from "../utils";

@observer
class LoginForm extends Component {
    constructor() {
        super();
        this.loginRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    componentDidMount() {
        const { store } = this.props;
        const data = {
            token: localStorage.getItem("token") || this.props.match.params.token,
        };
        console.log("MOUNT;", data.token)
        if (data.token) {
            store.logIn(data);
        }
    }


    logInAction = (e) => {
        const { store } = this.props;
        const login = this.loginRef.current.value;
        const password = this.passwordRef.current.value;
        store.logIn(login, password);
    };

    logInVkAction = (e) => {
        const { store } = this.props;

        store.logInVk();
    };

    render() {
        const { store } = this.props;
        console.log('render login form', store.session.token)
        if (!!store.session.token) {
            return <Redirect to='/'/>;
        }

        return (
            store.isLoading
                ? 'Loading...'
                : <form>
                    <input type="text" placeholder="login" ref={this.loginRef}/>
                    <input type="password" placeholder="******" ref={this.passwordRef}/>
                    <input type="button" value="Log In" onClick={this.logInAction}/>

                    <input type="button" value="Log VK" onClick={this.logInVkAction}/>

                </form>
        )
    }
}

export default LoginForm;