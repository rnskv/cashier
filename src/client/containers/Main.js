import React, {Component} from 'react';
import {observer} from 'mobx-react';
import mainStore from '../store/main';

@observer
class Main extends Component {
    constructor() {
        super();
        this.store = mainStore;
        setTimeout(() => {
            this.store.setHello();
        }, 3000)
    }
    render() {
        console.log(this.store);
        return (
            <h1>Hello world {this.store.hello}</h1>
        )
    }
}

export default Main;