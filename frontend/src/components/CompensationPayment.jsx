import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Form, Button, Icon, Modal, Header } from 'semantic-ui-react';

import ReactTable from 'react-table';
import "react-table/react-table.css";

import * as compensationAction from '../actions/compensationAction';
import {formatDate} from '../global_functions/global_function'

class CompensationPayment extends Component {

    constructor(props) {
        super(props);

        //formatDate(this.props.compensations.dateCompensation);

        this.handleSeeCompensationsButton = this.handleSeeCompensationsButton.bind(this);

        this.state = {
            compensations: [],
            modalOpen: false
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    componentDidMount() {
        console.log("COMPENSATIONSPAYMENT COMPONENT -- COMPONENT DID MOUNT -- ", this.props.compensations)
        this.loadCompensationState();
    }

    handleSeeCompensationsButton() {
        this.props.loadCompensationByWorker('5b03f310dd287203bc2cd533');
        console.log('Compensaciones filtradas=>', this.props.compensations)
    }

    loadCompensationState() {
        this.props.loadAllCompensations().then(() => {
            if (Array.isArray(this.props.compensations)) {
                console.log('Array es array')
                this.setState({
                    compensations: this.props.compensations
                });
            }
        });
    }

    render() {
        return (
            <Grid columns={2}>
                <Grid.Row centered>
                    <Grid.Column width={4}>
                        <h3>Compensation Payment</h3>
                        <hr />
                        <Form>
                            <Form.Input label='Worker name' value='Pepe' />
                            <Form.Input label='Worker DNI' value='29533302H' />
                            <Form.Input label='Worker ID' value='1' />
                            <Form.Button onClick={this.handleSeeCompensationsButton}>Ver compensaciones</Form.Button>

                        </Form>

                    </Grid.Column>
                    <Grid.Column width={5}>
                        <ReactTable
                            filterable
                            data={this.props.compensationsFilter}
                            columns={[
                                {
                                    Header: "Compensation payment",
                                    columns: [
                                        {
                                            Header: "Fecha compensacion",
                                            id:'dateCompensation',
                                            accessor: d=>formatDate(d.dateCompensation)
                                        },

                                        {
                                            Header: "Cantidad a cobrar",
                                            accessor: "payment",
                                        },
                                        {
                                            Header: 'Cobrar',
                                            accessor: 'payment',
                                            Cell: row => (
                                                <Modal
                                                    trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
                                                    open={this.state.modalOpen}
                                                    onClose={this.handleClose}
                                                    size='small'
                                                >
                                                    <Header icon='money' content='Compensation payment' />
                                                    <Modal.Content>
                                                        <h3>How do you want to get payed your compensation?</h3>
                                                        <Button.Group>
                                                            <Button>Money</Button>
                                                            <Button.Or/>
                                                            <Button positive>Time</Button>
                                                        </Button.Group>
                                                    </Modal.Content>
                                                    <Modal.Actions>
                                                        <Button color='red' onClick={this.handleClose} inverted>
                                                            <Icon name='remove' /> Close
                                                        </Button>
                                                    </Modal.Actions>
                                                </Modal>
                                            )
                                        }

                                    ]
                                },
                            ]}
                            style={{
                                height: "600px" // This will force the table body to overflow and scroll, since there is not enough room
                            }}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('mapstatetoprops compensationspayment-> ', state)
    return {
        //COMPENSACIONES
        compensations: state.compensationsReducer.compensationList,
        compensationsFilter: state.compensationsReducer.compensationListFilter,

        //EVENTOS
        events:state.calendarReducer.calendarEvents
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        //COMPENSACIONES
        loadAllCompensations: () => dispatch(compensationAction.loadAllCompensations()),
        loadCompensationByWorker: worker => dispatch(compensationAction.loadCompensationByWorker(worker)),

        //EVENTOS
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompensationPayment);
