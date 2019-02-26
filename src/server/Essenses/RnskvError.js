class RnskvError extends Error {
    constructor(data) {
        super();
        const {
            code = 0,
            type = 'Unexpected',
            message = 'Неизвестная ошибка',
        } = data;

        this.name = 'RNSKV error';
        this.code = code;
        this.type = type;
        this.message = message;
        // this.stack = (new Error()).stack || null;
    }
}

module.exports = RnskvError;