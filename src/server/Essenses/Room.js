class Room {
    constructor(data) {
        this.id = data.id;
        this.maxParticipantsCount = 4;
        this.creatorId = data.creatorId;
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

    leave(userId) {
        this.participants = [...this.participants].filter(participant => {
            return participant.id !== userId
        })
    }

    inRoom(userId) {
        return !!this.participants.filter(participant => participant.id === userId).length
    }
}

module.exports = Room;