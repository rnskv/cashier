const Game = require('./Game');

class Room {
    constructor(data) {
        this.id = data.id;
        this.maxParticipantsCount = 4;
        this.creatorId = data.creatorId;
        this.participants = [];
        this.game = null;
    }

    getId() {
        return this.id;
    }

    getMaxParticipantCount() {
        return this.maxParticipantsCount;
    }

    join(user) {
        this.participants.push(user)
    }

    leave(userId) {
        this.participants = [...this.participants].filter(participant => {
            return participant.id !== userId
        })
    }

    inRoom(userId) {
        return !!this.participants.filter(participant => participant.id === userId).length
    }

    startGame() {
        this.game = new Game(this.getId());
    }

    remove() {
        console.log('remove room');
        if (this.game) {
            this.game.Ticker.deleteAllTimers();
        }
    }
}

module.exports = Room;