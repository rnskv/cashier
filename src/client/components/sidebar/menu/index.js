import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import Item from './Item'

@observer
class Menu extends Component {
    constructor() {
        super();
        this.state = {
            groups: [
                {
                    name: 'violet',
                    links: [
                        {
                            name: 'Rooms',
                            description: 'Start your game',
                            href: '/',
                            active: true
                        }
                    ]
                },
                {
                    name: 'blue',
                    links: [
                        {
                            name: 'Games',
                            description: 'Your active games',
                            href: '/test',
                            active: false
                        }
                    ]
                },
                {
                    name: 'green',
                    links: [
                        {
                            name: 'FAQ',
                            description: 'More about project',
                            href: '/about',
                            active: false
                        }
                    ]
                }
            ]

        }
    }

    render() {
        return (
            <div className="sidebar-menu">
                {
                    this.state.groups.map(group => {
                        return <div key={group.name} className={`sidebar-menu__group sidebar-menu__group--${group.name}`}>
                            {
                                group.links.map(link => {
                                    return <Item link={link}/>
                                })
                            }
                        </div>
                    })
                }
            </div>
        )
    }
}

export default Menu;
