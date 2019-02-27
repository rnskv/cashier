const Ticker = require( './Ticker');

class Game {
    constructor() {
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
        console.log('init timer');
    }

    stepCb(emitFunction) {
        return (time) => {
            console.log('timer tick', time);
            emitFunction(time);
        }
    };

    finishCb(emitFunction) {
        return (time) => {
            console.log('finish tick', time);
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