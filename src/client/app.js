import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Router from './router'

import './styles/default.scss';

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