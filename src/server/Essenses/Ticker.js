class Ticker {
    constructor() {
        this.timers = new Map();
        this.isPause = false;

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
                this.timers.delete(timer.name);
                setTimeout(timer.finishCb, this.step, timer.time);
            }

            timer.stepCb(timer.time);
            timer.time -= this.step;
        });
    }
}

module.exports = Ticker;