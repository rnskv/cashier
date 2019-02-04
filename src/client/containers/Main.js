import React, {Component} from 'react';
import {observer} from 'mobx-react';
import mainStore from '../store/main';

@observer
class Main extends Component {
    constructor() {
        super();
        this.store = mainStore;
    }
    render() {
        return (
            <h1>Hello world baby</h1>
        )
    }
}

export default Main;