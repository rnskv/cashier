import React from 'react';

import { observer } from 'mobx-react';

@observer
class InteractionButton extends React.Component {
    render() {
        const { isStarted, isUserRoom, join, leave } = this.props;

        if (isStarted) return 'Вступить в игру'
        return isUserRoom
            ? <button className="room-info__button button" onClick={leave}>Leave</button>
            : <button className="room-info__button button" onClick={join}>Join</button>
    }
}

export default InteractionButton;