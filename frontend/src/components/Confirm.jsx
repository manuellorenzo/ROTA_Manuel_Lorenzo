import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

class ConfirmComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { open: props.show, onClose: props.onClose, onConfirm: props.onConfirm }
        console.log("Confirm initiated", props)
    }

    componentWillReceiveProps(nextProps) {
        console.log("Confirm recieve props", nextProps)
        this.setState({ open: nextProps.show, onClose: nextProps.onClose, onConfirm: nextProps.onConfirm });
    }
    show = () => this.setState({ open: true })
    handleConfirm = () => this.props.onConfirm();
    handleCancel = () => this.props.onClose();

    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.state.open;
    }

    render() {
        return (
            <div>
                <Confirm
                    size="tiny"
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </div>
        )
    }
}

export default ConfirmComponent