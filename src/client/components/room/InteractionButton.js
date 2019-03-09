import React from 'react';

import { observer } from 'mobx-react';

@observer
class InteractionButton extends React.Component {
    render() {
        const { isStarted, isUserRoom, join, leave } = this.props;

        // if (isStarted && isUserRoom) return <button className="room-info__button button" onClick={leave}>Connect</button>;
        if (isUserRoom) return <button className="room-info__button button--default button" onClick={leave}>Leave</button>;

        return <button className="room-info__button button" onClick={join}>Join</button>
    }
}

export default InteractionButton;