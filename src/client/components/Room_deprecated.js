import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Room_deprecated extends Component {
    constructor() {
        super();
        this.state = {
            isShowInstructions: false
        }
    }

    onMouseEnter = (e) => {
        this.setState({
            isShowInstructions: true
        })
    };

    onMouseLeave = (e) => {
        this.setState({
            isShowInstructions: false
        })
    };

    renderRoomBank() {
        return (
            <div className="room-info__bank">
                <div className="bank-title title--grey title--small">
                    At stake
                </div>
                <div className="room-info__bank__sum">
                    $666
                </div>
            </div>
        )
    }

    renderInfoButtons() {
        return (
            this.props.isUserRoom
                ? <button className="room-info__button button" onClick={this.props.leave}>Leave</button>
                : <button className="room-info__button button" onClick={this.props.join}>Join</button>
        )
    }

    renderRoomUsers() {
        const { participants } = this.props;
        participants.map((participant, index) =>
            <div className="room-component-user" key={index}>
                <img className="room-component-user__avatar" src={participant.name ? participant.avatar : 'https://pp.userapi.com/c850428/v850428216/cdbb/PbE05TFTQdM.jpg?ava=1'} />
            </div>)
    }

    renderRoomSettings() {
        return (
            <React.Fragment>
                <div className="title title--grey title--room">Room settings:</div>
                <button className="changer" onClick={this.props.remove}>Kick player</button>
                <button className="changer" onClick={this.props.remove}>Change game</button>
                <button className="changer" onClick={this.props.remove}>Remove room</button>
            </React.Fragment>
        )
    }
    render() {

        const { participants, isUserCreator, isUserRoom } = this.props;
        const { isShowInstructions } = this.state;

        return <div className="room" onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter}>
            <div className="room-info">
                <div className="title title--white title--big">
                    BLACK JACK
                </div>
                {
                    !isShowInstructions
                        ? this.renderRoomBank()
                        : <div>How to play</div>
                }

                {
                    this.renderInfoButtons()

                }
            </div>
            <div className="room-component">
                <div className="room-component-users">
                    <div className="title title--grey title--room">Room's users:</div>

                    <div className="room-component-users__list">
                        {
                            this.renderRoomUsers()
                        }
                    </div>
                </div>
                <div className="room-component-controls">
                {
                    isUserCreator && isUserRoom
                        ? this.renderRoomSettings()
                        : 'Инфо'
                }
                </div>

            </div>
        </div>
    }
}

export default Room_deprecated;