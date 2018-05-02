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
    }

    BootstrapTableWorkers(props) {
        console.log('props table', props)
        const CaptionElement = () => <div><Header as="h2">{props.caption}</Header><Divider /></div>
        return (
            <BootstrapTable
                keyField={props.keyField}
                data={props.data}
                columns={props.columns}
                pagination={paginationFactory()}
                noDataIndication="Table is Empty"
                caption={<CaptionElement />}
            />
        )
    }
    render() {
        const columnsOnCall = [{
            dataField: "worker.name",
            text: 'Name',
            style: {
                'vertical-align': 'middle'
            }
        }, {
            text: 'Actions',
            formatter: () => <Button fluid onClick={() => this.props.removeWorker(worker)}>Remove from On Call Pool</Button>
        }];

        const columnsWorkers = [{
            dataField: "worker.name",
            text: 'Name',
            style: {
                'vertical-align': 'middle'
            }
        }, {
            text: 'Actions',
            formatter: () => <Button fluid>Add to On Call Pool</Button>
        }];

        return (
            <div>
                <Container>
                    <Grid centered columns='equal'>
                        <Grid.Row>
                            <Grid.Column>
                                <Button floated="left" onClick={() => console.log('workers', this.props.workers)}>Auto-schelude</Button>
                                <Button floated="right" onClick={() => this.props.addWorker({ id: this.props.workers.length + 1, name: 'Manuel Lorenzo', role: 'Admin' })}>Add employee</Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <this.BootstrapTableWorkers data={this.props.workers} keyField="workers.name" columns={columnsOnCall} caption={"On Call"} />
                            </Grid.Column>
                            <Grid.Column>
                                <this.BootstrapTableWorkers data={this.props.workers} keyField="workers.name" columns={columnsWorkers} caption={"Workers"} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
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
        removeWorker: worker => dispatch(workersActions.removeWorker(worker)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Workers);