import React, {Fragment} from 'react';
import { Route, Link } from 'react-router-dom'

import MainContainer from '../containers/Main';

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;


export default () => (
    <Fragment>
        <Link to="/about">About</Link>
        <Link to="/">Main</Link>

        <Route exact path="/" component={MainContainer} />
        <Route path="/about" component={About} />
    </Fragment>
)