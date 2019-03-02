const Ticker = require( './Ticker');

class Game {
    constructor(data) {
        const { playersCount } = data;
        this.Ticker = new Ticker();
        this.step = 0;
    }

    setUserStepTimer(data) {
        const { name, time, stepCb, finishCb } = data;
        this.Ticker.setTimer({
            name,
            time,
            stepCb,
            finishCb: (time) => {
                this.setUserStepTimer(data);
                finishCb(time)
            }
        });
    }

    stepCb(emitFunction) {
        return (time) => {
            emitFunction(time);
        }
    };

    finishCb(emitFunction) {
        return (time) => {
            this.nextStep();
            emitFunction(time);
        }
    };

    nextStep() {
        console.log('nextStep');

        this.step += 1;
    }
}

module.exports = Game;