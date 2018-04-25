import React, { Component } from 'react';
import Login from './Login';
import HorizontalMenu from './Menu';

function Logged(props) {
    const isLogged = props.isLogged;
    if (isLogged === true) {
        return <HorizontalMenu />;
    }
    return <Login />;
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogged : false
        }
    }
    render() {
        return (
            <div>
                <Logged isLogged = {this.state.isLogged}/>
            </div>
        )
    }
}
export default App;