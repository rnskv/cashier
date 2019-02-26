const Ticker = require( './Ticker');

class Game {
    constructor() {
        this.Ticker = new Ticker();
        this.timer = null;
        this.step = 0;
        this.setUserStepTimer();
    }

    setUserStepTimer() {
        this.Ticker.setTimer({
            name: 'step',
            time: 4000,
            stepCb: this.remindTick.bind(this),
            finishCb: this.finishTick.bind(this)
        })
    }

    remindTick(time) {
        console.log('timer tick', time)
    };

    finishTick(time) {
        console.log('finish tick', time);
        this.setUserStepTimer();
    };

    nextStep() {
        this.step += 1;
    }
}

module.exports = Game;