import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Room extends Component {
    render() {
        return <div className="room">
            <div className="room-users">
                {
                    this.props.participants.map((participant, index) =>
                        <div className="room-user" key={index}>
                            {/*{ participant.name }*/}
                            <img className="room-user__avatar" src={participant.avatar} />
                        </div>)
                }
            </div>
            <div className="room-control">
                <button className="button room-control__button" onClick={this.props.remove}>Начать игру</button>
                <button className="button room-control__button" onClick={this.props.join}>Войти</button>
                <button className="button room-control__button" onClick={this.props.remove}>Удалить комнату</button>
            </div>
        </div>
    }
}

export default Room;