import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';

import mainStore from '../store/main';
import userStore from '../store/user';

import UserBarContainer from '../containers/UserBar';

@observer
class Main extends Component {
    constructor() {
        super();
        this.store = mainStore;
        setTimeout(() => {
            this.store.setHello();
        }, 3000)
    }
    render() {

        if (!userStore.isAuth) {
            return <Redirect to={'/login'} />
        }

        return (
            <div>
                <UserBarContainer store={userStore}/>
            </div>
        )
    }
}

export default Main;