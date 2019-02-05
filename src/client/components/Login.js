import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { observer } from 'mobx-react';

@observer
class LoginForm extends Component {
    constructor() {
        super();
        this.loginRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    logInAction = (e) => {
        const { store } = this.props;
        const login = this.loginRef.current.value;
        const password = this.passwordRef.current.value;
        console.log(login, password, store);
        store.logIn(login, password);
    };

    render() {
        const { store } = this.props;
        console.log('this is auth', store.isAuth);

        if (store.isAuth) {
            return <Redirect to='/'/>;
        }

        return (
            store.isLoading
                ? 'Loading...'
                : <form>
                    <input type="text" placeholder="login" ref={this.loginRef}/>
                    <input type="password" placeholder="******" ref={this.passwordRef}/>
                    <input type="button" value="Log In" onClick={this.logInAction}/>
                </form>
        )
    }
}

export default LoginForm;