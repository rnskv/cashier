import React from 'react';

import { Router, Route, Link } from 'react-router-dom'
import Routes from './routes';
import { history } from "../utils";

export default () => (
    <Router history={history}>
        <Routes />
    </Router>
)
