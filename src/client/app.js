import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Router from './router'

import './styles/default.scss';
import {socket} from "./utils";

class Main extends Component {
    constructor() {
        super();
        socket.on('test', (data) => {
            alert('test');
        })
    }
    render() {
        return (
            <div className="wrapper">
                <Router/>
            </div>
        )
    }
}

ReactDOM.render(
    <Main/>, document.getElementById('root')
);