class Ticker {
    constructor() {
        this.timers = new Map();

        this.step = 1000;
        setInterval(this.tickTimers.bind(this), this.step);
        console.log('init timer');
    }

    setTimer(data) {
        const { name, time, stepCb, finishCb } = data;
        this.timers.set(name, {
            name, stepCb, finishCb, time
        });
    }

    tickTimers() {
        this.timers.forEach((timer) => {

            if (timer.time  <= 0) {
                this.deleteTimer(timer.name);
                timer.finishCb(timer.time);
            }

            timer.stepCb(timer.time);
            timer.time -= this.step;
        });
    }

    deleteTimer(name) {
        this.timers.delete(name);
    }

    deleteAllTimers() {
        this.timers.forEach(timer => {
            this.timers.delete(timer.name);
        })
    }
}

module.exports = Ticker;