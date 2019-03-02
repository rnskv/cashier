const Game = require('./Game');

class Room {
    constructor(data) {
        this.id = data.id;
        this.maxParticipantsCount = 4;
        this.creatorId = data.creatorId;
        this.participants = {
            1: null,
            2: null,
            3: null,
            4: null
        };
        this.game = null;
    }

    getId() {
        return this.id;
    }

    getMaxParticipantCount() {
        return this.maxParticipantsCount;
    }

    findFreePosition() {
        for (let participantPosition in this.participants) {
            if (this.participants.hasOwnProperty(participantPosition) && !this.participants[participantPosition]) {
                return participantPosition
            }
        }
        return false;
    }

    getParticipantPosition(id) {
        for (let participantPosition in this.participants) {
            if (this.participants.hasOwnProperty(participantPosition) &&
                this.participants[participantPosition].id === id) {
                return participantPosition
            }
        }
        return false
    }

    join(user, position) {
        this.participants[position] = user;
    }

    leave(userId, position) {
        this.participants[position] = null;
    }

    inRoom(userId) {
        return !!this.getParticipantPosition(userId)
    }

    startGame() {
        this.game = new Game(this.getId());
        return this.game;
    }

    remove() {
        if (this.game) {
            this.game.Ticker.deleteAllTimers();
        }
    }
}

module.exports = Room;