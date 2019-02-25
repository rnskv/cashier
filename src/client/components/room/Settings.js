import React from 'react'

export default ({removeRoom, kickPlayer, changeGame, startGame}) => (
    <div className="room-component-controls">
        <React.Fragment>
            <div className="title title--grey title--room">Room settings:</div>
            {/*<button className="changer" onClick={kickPlayer}>Kick player</button>*/}
            {/*<button className="changer" onClick={changeGame}>Change game</button>*/}
            <button className="changer" onClick={ removeRoom }>Remove room</button>
            <button className="changer" onClick={ startGame }>StartGame</button>
        </React.Fragment>
    </div>
)