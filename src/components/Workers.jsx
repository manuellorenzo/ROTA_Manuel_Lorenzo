import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List, Image, Grid, Table, Header, Button, Search, Container, Divider } from 'semantic-ui-react';
import _ from 'lodash'

import * as workersActions from '../actions/workersActions';

import ReactTable from 'react-table';
import "react-table/react-table.css";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


class Workers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            results: []
        }
        this.BootstrapTableWorkers = this.BootstrapTableWorkers.bind(this);
        this.ReactTableWorkers = this.ReactTableWorkers.bind(this);
    }

    BootstrapTableWorkers(props) {
        console.log('props table', props)
        const CaptionElement = () => <div><Header as="h2">{props.caption}</Header><Divider /></div>
        const options = {
            onSizePerPageChange: (sizePerPage, page) => {
                console.log('Size per page change!!!');
                console.log('Newest size per page:' + sizePerPage);
                console.log('Newest page:' + page);
            },
            onPageChange: (page, sizePerPage) => {
                console.log('Page change!!!');
                console.log('Newest size per page:' + sizePerPage);
                console.log('Newest page:' + page);
            }
        };
        return (
            <BootstrapTable
                keyField={props.keyField}
                data={props.data}
                columns={props.columns}
                noDataIndication="Table is Empty"
                caption={<CaptionElement />}
                height='120' scrollTop={'Bottom'}
            />
        )
    }

    ReactTableWorkers() {
        return (
            <div>
                <ReactTable
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            style: {
                               "text-align": "center"
                            }
                        };
                    }}
                    data={this.props.workers}
                    noDataText="No workers"
                    columns={[
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
                            Cell: row => (
                                <Button fluid onClick={() => this.props.removeWorker(row.row.id)} >Remove from the pool</Button>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        )
    }

    render() {
        const columnsOnCall = [{
            dataField: "name",
            text: 'Name',
            style: {
                'verticalAlign': 'middle'
            },
        }, {
            dataField: "id",
            text: 'ID',
            style: {
                'verticalAlign': 'middle'
            }
        }, {
            dataField: "actions",
            text: 'Actions',
            formatter: (cell, row) => <Button fluid onClick={() => this.props.removeWorker(row.id)}>Remove from On Call Pool</Button>
        }];

        const columnsWorkers = [{
            dataField: "name",
            text: 'Name',
            style: {
                'verticalAlign': 'middle'
            }
        }, {
            dataField: "id",
            text: 'ID',
            style: {
                'verticalAlign': 'middle'
            }
        }, {
            dataField: "actions",
            text: 'Actions',
            formatter: () => <Button fluid>Add to On Call Pool</Button>
        }];

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
                                <this.BootstrapTableWorkers remote data={this.props.workers} keyField={"id"} columns={columnsOnCall} caption={"On Call"} />
                            </Grid.Column>
                            <Grid.Column>
                                <div style={{ verticalAlign: "middle" }}>
                                    <this.ReactTableWorkers />
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
        workers: state.workers
    }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        // You can now say this.props.createBook
        addWorker: worker => dispatch(workersActions.addWorker(worker)),
        removeWorker: id => dispatch(workersActions.removeWorker(id)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Workers);