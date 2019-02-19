class Room {
    constructor(data) {
        this.id = Math.random();
        this.maxParticipantsCount = 4;
        this.creator = data._id;
        this.participants = [];
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
}

module.exports = Room;