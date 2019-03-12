import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import Menu from './menu'

@observer
class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <Menu/>
            </div>
        )
    }
}

export default Sidebar;