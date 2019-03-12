import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class Item extends Component {
    render() {
        const { link } = this.props;
        return (
            <Link to={link.href}>
                <div key={link.name} className={`sidebar-menu--item ${link.active ? 'sidebar-menu--item__active' : ''}`}>
                    <div className="sidebar-menu--item-name">{ link.name }</div>
                    <div className="sidebar-menu--item-description">{ link.description }</div>
                </div>
            </Link>
        )
    }
}

export default Item;
