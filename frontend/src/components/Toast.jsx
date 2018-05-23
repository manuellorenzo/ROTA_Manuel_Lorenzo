import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

class Toast extends Component {
    constructor(props) {
        super(props)
        console.log("TOAST GO")
        this.state = {
            showToast: false
        }

    }

    componentWillReceiveProps(nextProps) {
        console.log("willrecieveprops toast", nextProps.show);
        if (nextProps.show) {
            toast(nextProps.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                hideProgressBar: true,
                type: nextProps.type
            });
        }
    }

    render() {
        return (
            <div>
                <ToastContainer />
            </div>
        );
    }
}

export default Toast;