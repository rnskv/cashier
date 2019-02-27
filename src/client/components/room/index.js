import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';


import Settings from './Settings';
import Users from './Users';
import Bank from './Bank';
import InteractionButton from './InteractionButton';
import Information from './Information';

@observer
class Room extends Component {
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

    render() {
        const { participants, isUserCreator, creator, isUserRoom, userJoin, userLeave, removeRoom, startGame } = this.props;
        const { isShowInstructions } = this.state;

        return <div className="room" onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter}>
            <div className="room-info">
                <div className="title title--white title--big">BLACK JACK</div>

                {
                    !isShowInstructions || isUserRoom
                        ? <Bank/>
                        : <div className="flashbox">About game</div>
                }

                <InteractionButton isUserRoom={isUserRoom} join={userJoin} leave={userLeave}/>
            </div>
            <div className="room-component">
                {
                    !isShowInstructions || isUserRoom
                        ? <React.Fragment>
                            <Users participants={Object.values(participants)}/>

                            {
                                isUserCreator && isUserRoom
                                    ? <Settings
                                        removeRoom={removeRoom}
                                        kickPlayer={() => {}}
                                        changeGame={() => {}}
                                        startGame={startGame}
                                    />
                                    : <div className="room-component-host room-component-section">
                                        <div className="title title--grey title--room">Room's host</div>

                                        <div className="room-component-userinfo">
                                            <div className="room-component-user">
                                                <img className="room-component-user__avatar" src={creator.avatar} />
                                            </div>
                                            <span className="room-component-userinfo__name">{ creator.name } </span>
                                        </div>
                                    </div>
                            }
                        </React.Fragment>
                        : <Information/>
                }
            </div>
        </div>
    }
}

export default Room;