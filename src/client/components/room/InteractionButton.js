import React from 'react';

export default ({isUserRoom, join, leave}) => (
    isUserRoom
        ? <button className="room-info__button button" onClick={leave}>Leave</button>
        : <button className="room-info__button button" onClick={join}>Join</button>
)