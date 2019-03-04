import React from 'react'

export default ({removeRoom, kickPlayer, changeGame, startGame, isUserCreator, isStarted, connectGame}) => (
    <div className="room-component-controls">
        <React.Fragment>
            <div className="title title--grey title--room">Room settings:</div>
            {/*<button className="changer" onClick={kickPlayer}>Kick player</button>*/}
            {/*<button className="changer" onClick={changeGame}>Change game</button>*/}
            { isStarted ? <button className="changer" onClick={ connectGame }>Connect to game</button> : null }
            { !isStarted ? <button className="changer" onClick={ startGame }>StartGame</button> : null }
            { isUserCreator ? <button className="changer" onClick={ removeRoom }>Remove room</button> : null }
        </React.Fragment>
    </div>
)