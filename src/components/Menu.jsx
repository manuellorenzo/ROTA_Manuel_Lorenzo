import React, { Component } from 'react';
import { Input, Button, Grid, Form, Image, Menu } from 'semantic-ui-react'

import CalendarPage from './Calendar';
import Login from './Login';
import App from './App';
import Workers from './Workers';

import history from '../history';


function BasicRouting(props) {
    const activePage = props.activePage;
    console.log('activePage', activePage);
    if (activePage === 'home') {
        return <CalendarPage />;
    } else if(activePage === 'workers'){
        return <Workers />;
    }else if(activePage === 'login'){
        history.push("/login");
    }
    return <Workers />;
}

class HorizontalMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'home',
            pages: [
                {
                    section: 'home',
                    value: 'Home'
                },
                {
                    section: 'workers',
                    value: 'Workers'
                },
                {
                    section: 'login',
                    value: 'Login'
                }
            ]
        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu fixed="top" fluid widths={3} className="noScrollBar">
                    {
                        this.state.pages.map((item, index) => (
                            <Menu.Item name={item.section} active={activeItem === item.section}
                                onClick={this.handleItemClick}>{item.value}</Menu.Item>
                        )
                        )
                    }
                </Menu>
                <div className="paddingTopContent">
                    <BasicRouting activePage={activeItem} />
                </div>
            </div>
        )
    }
}
export default HorizontalMenu;