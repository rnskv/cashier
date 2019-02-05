import React, {Component} from 'react';
import {observer} from 'mobx-react';
import userStore from '../store/user';

@observer
class UserBar extends Component {
    render() {
        const { store } = this.props;
        return (
            <div className="userbar" >
                <img src="https://cs8.pikabu.ru/post_img/big/2016/07/09/7/1468062365176514879.jpg" className="userbar-avatar" alt="avatar"/>
                <div className="userbar-login">
                    <span className="userbar-loginfield">{store.login}</span>
                    <span className="userbar-levelfield">{store.level} lvl</span>
                    <input className="userbar-button" type="button" value="Выйти" onClick={store.logOut}/>
                </div>
            </div>
        )
    }
}

export default UserBar;