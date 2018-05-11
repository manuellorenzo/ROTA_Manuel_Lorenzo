import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

class ConfirmComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { open: props.open, onClose: props.onClose, onConfirm: props.onConfirm }
        console.log("Confirm initiated", props)
    }

    componentWillReceiveProps(nextProps){
        console.log("Confirm initiated", nextProps)
        this.setState({ open: nextProps.open, onClose: nextProps.onClose, onConfirm: nextProps.onConfirm });
    }
    show = () => this.setState({ open: true })
    handleConfirm = () => this.setState({ result: 'confirmed', open: false })
    handleCancel = () => this.setState({ result: 'cancelled', open: false })

    render() {
        const { open, result } = this.state

        return (
            <div>
                <Confirm
                    open={open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </div>
        )
    }
}

export default ConfirmComponent