class Room {
    constructor(data) {
        this.id = Math.random();
        this.creator = data._id;
        this.participants = [/* ids */];
    }

    getId() {
        return this.id;
    }
}

module.exports = Room;