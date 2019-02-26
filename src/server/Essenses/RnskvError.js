class RnskvError extends Error {
    constructor(data) {
        super();
        const {
            code = 0,
            type = 'Unexpected',
            message = 'Неизвестная ошибка',
            stack = (new Error()).stack
        } = data;

        this.name = 'RNSKV error';
        this.code = code;
        this.type = type;
        this.message = message;
        this.stack = stack;
    }
}

module.exports = RnskvError;