import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Router from './router'

class Main extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <Router/>
        )
    }
}

ReactDOM.render(
    <Main/>, document.getElementById('root')
);