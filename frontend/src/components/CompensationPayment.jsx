import React, { Component } from 'react';
import { Grid, Form } from 'semantic-ui-react';

import ReactTable from 'react-table';
import "react-table/react-table.css";

import * as compensationAction from '../actions/compensationAction';

class CompensationPayment extends Component {
    render() {
        return (
            <Grid columns={2}>
                <Grid.Row centered>
                    <Grid.Column width={4}>
                        <h3>Compensation Payment</h3>
                        <hr/>
                        <Form>
                            <Form.Input label='Worker name' value='Pepe' />
                            <Form.Input label='Worker DNI' value='29533302H'/>
                            <Form.Input label='Worker ID' value='1'/>
                            
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <ReactTable
                            filterable
                            columns={[
                                {
                                    Header: "On call workers",
                                    columns: [
                                        {
                                            Header: "Dias trabajados",
                                            accessor: "dni"
                                        },

                                        {
                                            Header: "Cobrado",
                                            accessor: "cobrado",
                                        },
                                        {
                                            Header: 'Sin cobrar',
                                            accessor: 'sin_cobrar'
                                        },
                                        {
                                            Header: 'Delete worker',
                                            accessor: 'deleteWorker'

                                        },
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

const mapStateToProps=(state, ownProps)=>{
    console.log('mapstatetoprops-> ', state)
    return{
        compensations:state.compensationsReducer.compensations
    };
}

const mapDispatchToProps=(dispatch)=>{
    return{
        loadAllCompensations: ()=>dispatch(compensationAction.loadAllCompensations())
    }
}

export default CompensationPayment;
