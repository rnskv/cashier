class Room {
    constructor(token) {
        this.id = token;
        this.creator = token || {};
        this.participants = [/* tokens */];
    }
}

module.export = Room;