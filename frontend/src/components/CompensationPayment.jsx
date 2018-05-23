import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Form, Button, Icon, Modal, Header } from 'semantic-ui-react';

import ReactTable from 'react-table';
import "react-table/react-table.css";

import * as compensationAction from '../actions/compensationAction';

class CompensationPayment extends Component {

    constructor(props) {
        super(props);

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
                                    Header: "On call workers",
                                    columns: [
                                        {
                                            Header: "Fecha compensacion",
                                            accessor: "activity"
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
                                                    trigger={<Button>Show Modal</Button>}
                                                    header='Reminder!'
                                                    content='Call Benjamin regarding the reports.'
                                                    actions={[
                                                        'Snooze',
                                                        { key: 'done', content: 'Done', positive: false },
                                                    ]}
                                                />
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
        compensations: state.compensationsReducer.compensationList,
        compensationsFilter: state.compensationsReducer.compensationListFilter
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllCompensations: () => dispatch(compensationAction.loadAllCompensations()),
        loadCompensationByWorker: worker => dispatch(compensationAction.loadCompensationByWorker(worker))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompensationPayment);
