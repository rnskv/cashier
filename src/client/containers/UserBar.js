import React, {Component} from 'react';
import {observer} from 'mobx-react';

import Loader from '../components/Loader';

@observer
class UserBar extends Component {
    constructor() {
        super();

        this.state = {
            isShowAvatar: false
        };

        this.avatarRef = React.createRef();
    }

    avatarLoadHandler() {
        console.log(123);
        this.setState({
            isShowAvatar: true
        })
    }

    componentDidUpdate() {
        const { store } = this.props;
        if (!store.isLoading) {
            this.avatarRef.current.onload = this.avatarLoadHandler.bind(this);
        }
    }

    render() {
        const { store } = this.props;
        return (
            <div className="userbar" >
                {
                    store.isLoading
                        ? <Loader />
                        : <React.Fragment>
                            <div className="userbar-avatar">
                                <img ref={this.avatarRef} style={{opacity: this.state.isShowAvatar ? 1 : 0}} src="https://cs8.pikabu.ru/post_img/big/2016/07/09/7/1468062365176514879.jpg" alt="avatar"/>
                            </div>
                            <div className="userbar-login">
                                <span className="userbar-loginfield">{store.login}</span>
                                <span className="userbar-levelfield">{store.level} lvl</span>
                                <input className="userbar-button" type="button" value="Выйти" onClick={store.logOut}/>
                            </div>
                        </React.Fragment>
                }
            </div>
        )
    }
}

export default UserBar;