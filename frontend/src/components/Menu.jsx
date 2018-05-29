import React, { Component } from 'react';
import { Input, Button, Grid, Form, Image, Menu } from 'semantic-ui-react'

import CalendarPage from './Calendar';
import Login from './Login';
import App from './App';
import Workers from './Workers';
import Configuration from './Configuration';
import CompensationPayment from './CompensationPayment';

import history from '../history';
import Reports from './Report';
import MonthlyReport from './MonthlyReport';


function BasicRouting(props) {
    const activePage = props.activePage;
    console.log('activePage', activePage);
    if (activePage === 'home') {
        return <CalendarPage />;
    } else if(activePage === 'workers'){
        return <Workers />;
    }else if(activePage === 'logout'){
        history.push("/login");
        return null;
    }else if(activePage === 'confi'){
        return <Configuration />
    }else if(activePage === 'reports'){
        return <Reports />;
    }else if (activePage==='compensation_payment'){
        return <CompensationPayment/>
    }else if (activePage==='monthlyReport'){
        return <MonthlyReport/>
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
                    section: 'confi',
                    value: 'Configuration'
                },
                {
                    section: 'reports',
                    value: 'Reports'
                },
                {
                    section: 'compensation_payment',
                    value: 'Compensation Payment'
                },
                {
                    section: 'monthlyReport',
                    value: 'Monthly Report'
                },
                {
                    section: 'logout',
                    value: 'Logout'
                }
                
            ]
        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu fixed="top" fluid widths={this.state.pages.length} className="noScrollBar">
                    {
                        this.state.pages.map((item, index) => (
                            <Menu.Item key={item.section.toString()} name={item.section} active={activeItem === item.section}
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