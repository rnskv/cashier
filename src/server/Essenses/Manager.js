'use strict';
// const DependenciesManager = require('../managers/DependenciesManager');

class Manager {
    constructor(settings = {}) {
        const { managers = [] } = settings;
        this.managers = {};
        this.setManagers(managers)
    }

    setManagers(managers) {
        this.managers = managers;
    }
}

module.exports = Manager;