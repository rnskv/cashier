import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Settings from './Settings';
import Users from './Users';
import Bank from './Bank';
import InteractionButton from './InteractionButton';
import Information from './Information';

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
        const { participants, isUserCreator, isUserRoom, userJoin, userLeave, removeRoom, startGame } = this.props;
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
                            <Users participants={participants}/>

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
                                                <img className="room-component-user__avatar" src={'https://pp.userapi.com/c850428/v850428216/cdbb/PbE05TFTQdM.jpg?ava=1'} />
                                            </div>
                                            <span className="room-component-userinfo__name">MySQL</span>
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