import React, {Component} from 'react';
import {observer} from 'mobx-react';
import userStore from '../store/user';

import LoginForm from '../components/LoginForm';

@observer
class Login extends Component {
    render() {
        console.log(this.store);
        return (
            <LoginForm store={userStore}/>
        )
    }
}

export default Login;