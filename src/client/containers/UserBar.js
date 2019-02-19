import React, {Component} from 'react';
import {observer} from 'mobx-react';

import Loader from '../components/Loader';

@observer
class UserBar extends Component {

    render() {
        const { store } = this.props;
        return (
            <div className="userbar">
                {
                    store.isLoading
                        ? <Loader />
                        : <React.Fragment>
                            <div className="userbar-avatar">
                                <img src={store.profile.avatar} alt="avatar"/>
                            </div>
                            <div className="userbar-login">
                                <span className="userbar-loginfield">{store.login}</span>
                                <span className="userbar-levelfield">{store.profile.level} lvl</span>
                                <input className="button userbar-button" type="button" value="Выйти" onClick={store.logOut}/>
                            </div>
                        </React.Fragment>
                }
            </div>
        )
    }
}

export default UserBar;