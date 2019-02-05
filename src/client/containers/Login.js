import React, {Component} from 'react';
import {observer} from 'mobx-react';
import userStore from '../store/user';

import LoginComponent from '../components/Login';

@observer
class Login extends Component {
    render() {
        console.log(this.store);
        return (
            <LoginComponent store={userStore}/>
        )
    }
}

export default Login;