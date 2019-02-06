import React, { Component } from 'react';

import '../styles/loader.css';
class LobbyUser extends Component {
    constructor() {
        super();

        this.state = {
            isShowAvatar: false
        };

        this.avatarRef = React.createRef();
    }

    componentDidMount() {
        this.avatarRef.current.onload = this.avatarLoadHandler.bind(this);
    }

    avatarLoadHandler() {
        this.setState({
            isShowAvatar: true
        })
    }

    render() {
        const { data } = this.props;
        console.log(data);
        return (
            <div className="lobby-user">
                <div className="lobby-user-avatar">
                    <img ref={this.avatarRef} src={data.avatar} style={{opacity: this.state.isShowAvatar ? 1 : 0}}/>
                </div>

                <div className="lobby-user-login">
                    {data.login}
                </div>
            </div>
        )
    }
}

export default LobbyUser;