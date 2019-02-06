import React, {Component} from 'react';
import {observer} from 'mobx-react';

import Loader from '../components/Loader';
import LobbyUser from '../components/LobbyUser';

@observer
class Lobby extends Component {
    render() {
        const { store } = this.props;
        console.log(store);
        return (
            <div className="lobby" >
                {/*<h1>Lobby</h1>*/}
                {/*{*/}
                    {/*store.users.map((user, id) => <div key={id}>{user.login}</div>)*/}
                {/*}*/}
                <h1 className="title title--white">Сейчас онлайн:</h1>
                <div className="lobby-users">
                    {
                        store.users.map((user, id) => <LobbyUser key={id} data={user}/>)
                    }
                </div>
            </div>
        )
    }
}

export default Lobby;