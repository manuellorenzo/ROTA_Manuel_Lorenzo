import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List, Image, Grid, Table, Header, Button, Search, Container, Divider, Icon } from 'semantic-ui-react';
import _ from 'lodash'

import * as workersActions from '../actions/workersActions';
import '../style.css';

import ReactTable from 'react-table';
import "react-table/react-table.css";



class Workers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            results: []
        }
        this.ReactTableWorkers = this.ReactTableWorkers.bind(this);
        this.ButtonsTableWorkers = this.ButtonsTableWorkers.bind(this);
    }

    ReactTableWorkers(props) {
        return (
            <div>
                <ReactTable
                    getTdProps={(state, rowInfo, column) => {
                        return {
                            style: {
                                "whiteSpace": "normal",
                                "display": "flex",
                                "alignItems": "center",
                                "justifyContent": "center"

                            }
                        };
                    }}
                    filterable
                    data={props.data}
                    noDataText="No workers"
                    columns={props.columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        )
    }

    ButtonsTableWorkers(props) {
        console.log("ROW VALUE", props.row.row.id);
        console.log("PROP PLS", this.props.onCall.map((item) => props.row.row.id === item.id));
        if (this.props.onCall.map((item) => props.row.row.id === item.id).includes(true)) {
            return (<div style={{ "width": "100%" }}>
                <Button fluid className="flexboxCenterVerHor" icon='close' onClick={() => {
                    this.props.removeWorker(props.row.row.id)
                    this.props.removeFromOnCall(props.row.row.id)
                }} />
            </div>)
        } else {
            return (<div style={{ "width": "100%" }}>
                <Button.Group widths='2'>
                    <Button className="flexboxCenterVerHor" icon='bell' onClick={() => this.props.addToOnCall(props.row.row)} />
                    <Button className="flexboxCenterVerHor" icon='close' onClick={() => {
                        this.props.removeWorker(props.row.row.id)
                        this.props.removeFromOnCall(props.row.row.id)
                    }} />
                </Button.Group>
            </div>)
        }
    }

    render() {
        const columnOnCall = [
            {
                Header: "Name",
                id: "name",
                accessor: d => d.name,
            },
            {
                Header: "ID",
                id: "id",
                accessor: d => d.id,
            },
            {
                filterable: false,
                Cell: row => (
                    <Button fluid icon='bell slash' onClick={() => this.props.removeFromOnCall(row.row.id)} />
                )

            }
        ]

        const columnWorkers = [
            {
                Header: "Name",
                id: "name",
                accessor: d => d.name,
            },
            {
                Header: "ID",
                id: "id",
                accessor: d => d.id,
            },
            {
                filterable: false,
                Cell: row => (
                    <div style={{ "width": "100%" }}>
                        <this.ButtonsTableWorkers row={row} />
                    </div>
                )
            }
        ]

        return (
            <div>
                <Container>
                    <Grid centered columns='equal'>
                        <Grid.Row>
                            <Grid.Column>
                                <Button floated="left" onClick={() => console.log('workers', this.props.workers.length)}>Auto-schelude</Button>
                                <Button floated="right" onClick={() => this.props.addWorker({ id: Math.random(), name: 'Manuel Lorenzo', role: 'Admin' })}>Add employee</Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <div>
                                    <Header as="h2">On Call</Header><Divider />
                                    <this.ReactTableWorkers data={this.props.onCall} columns={columnOnCall} />
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div>
                                    <Header as="h2">Workers</Header><Divider />
                                    <this.ReactTableWorkers data={this.props.workers} columns={columnWorkers} />
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('maptostate', state);
    return {
        // You can now say this.props.workers
        workers: state.workersReducer.workers,
        onCall: state.workersReducer.onCall
    }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        // You can now say this.props.createBook
        addWorker: worker => dispatch(workersActions.addWorker(worker)),
        removeWorker: id => dispatch(workersActions.removeWorker(id)),
        addToOnCall: worker => dispatch(workersActions.addToOnCall(worker)),
        removeFromOnCall: id => dispatch(workersActions.removeFromOnCall(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Workers);