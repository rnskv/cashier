import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Room extends Component {
    render() {
        return <div className="room">
            <div className="room-users">
                <div className="room-user">
                    Олег
                </div>
            </div>
            <div className="room-control">
                <button className="button room-control__button" onClick={this.props.remove}>Начать игру</button>
                <button className="button room-control__button" onClick={this.props.remove}>Удалить комнату</button>
                <button className="button room-control__button" onClick={this.props.remove}>Настройки</button>
            </div>
        </div>
    }
}

export default Room;