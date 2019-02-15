import React, {Fragment} from 'react';
import { Route, Link, Redirect } from 'react-router-dom'

import MainContainer from '../containers/Main';
import LoginContainer from '../containers/Login';

import TestContainer from '../containers/Test';


const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;


export default () => (
    <Fragment>
        <Link to="/about">About</Link>
        <Link to="/">Main</Link>
        <Link to="/login">Auth</Link>

        <Route exact path="/" component={MainContainer} />
        <Route path="/login" component={LoginContainer} />

        <Route path="/about" component={About} />


        <Route path='/test/:token?' component={TestContainer} />
    </Fragment>
)