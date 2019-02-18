'use strict';
const DependenciesManager = require('../managers/DependenciesManager');

const Manager = class {
    constructor(settings = {}) {
        const { managers = [] } = settings;
        this.managers = {};
        console.log('Manager init', managers);
        this.setManagers(managers)
    }

    setManagers(managers) {
        this.managers = DependenciesManager.getManagers(managers);
    }
};

module.exports = Manager;