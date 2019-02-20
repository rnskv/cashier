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

    leave(userId) {
        console.log(`Игрок ${userId} вышел`);
        this.participants = [...this.participants].filter(participant => {
            console.log(participant)

            return  participant.id !== userId
        })
    }

    inRoom(userId) {
        return !!this.participants.filter(participant => participant.id === userId).length
    }
}

module.exports = Room;