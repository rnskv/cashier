import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Room extends Component {
    render() {
        return <div className="room">
            {/*/!*{ this.props.isUserRoom ? 'Моя комната' : 'Не моя комната'}*!/*/}
            {/*/!*<div className="room-users">*!/*/}
            {/*/!*{*!/*/}
                {/*// this.props.participants.map((participant, index) =>*/}
                {/*//     <div className="room-user" key={index}>*/}
                {/*//         <img className="room-user__avatar" src={participant.avatar} />*/}
                {/*//     </div>)*/}
            {/*/!*}*!/*/}
            {/*/!*</div>*!/*/}
            {/*/!*<div className="room-control">*!/*/}
                {/*/!*<button className="button room-control__button" onClick={this.props.remove}>Начать игру</button>*!/*/}
                {/*/!*<button className="button room-control__button" onClick={this.props.join}>Войти</button>*!/*/}
                {/*/!*<button className="button room-control__button" onClick={this.props.remove}>Удалить комнату</button>*!/*/}
                {/*/!*<button className="button room-control__button" onClick={this.props.leave}>Выйти</button>*!/*/}
            {/*/!*</div>*!/*/}
            <div className="room-info">
                <div className="title title--white title--big">
                    BLACK JACK
                </div>
                <div className="room-info__bank">
                    <div className="bank-title title--grey title--small">
                        At stake
                    </div>
                    <div className="room-info__bank__sum">
                        $666
                    </div>
                </div>
                {
                    this.props.isUserRoom
                        ? <button className="room-info__button button" onClick={this.props.leave}>Leave</button>
                        : <button className="room-info__button button" onClick={this.props.join}>Join</button>

                }
            </div>
            <div className="room-component">
                <div className="room-component-users">
                    <div className="title title--grey title--room">Room's users:</div>

                    <div className="room-component-users__list">
                        {
                            this.props.participants.map((participant, index) =>
                                <div className="room-component-user" key={index}>
                                    <img className="room-component-user__avatar" src={participant.name ? participant.avatar : 'https://pp.userapi.com/c850428/v850428216/cdbb/PbE05TFTQdM.jpg?ava=1'} />
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Room;