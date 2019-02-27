import React from 'react'
export default ({participants}) => (
    <div className="room-component-users room-component-section">
        <div className="title title--grey title--room">Room's users:</div>

        <div className="room-component-users__list">
            {
                participants.map((participant, index) => {
                    return participant
                        ? <div className="room-component-user " key={index}>
                            <img className="room-component-user__avatar" src={participant.avatar} />
                        </div>
                        : <div className="room-component-user " key={index}>
                            {/*<img className="room-component-user__avatar" src={'https://pp.userapi.com/c850428/v850428216/cdbb/PbE05TFTQdM.jpg?ava=1'} />*/}
                        </div>
                })
            }
        </div>
    </div>
)