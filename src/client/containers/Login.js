import React, {Component} from 'react';
import {observer} from 'mobx-react';
import userStore from '../store/user';

import LoginForm from '../components/LoginForm';

@observer
class Login extends Component {
    render() {
        return (
            <LoginForm match={this.props.match} store={userStore}/>
        )
    }
}

export default Login;