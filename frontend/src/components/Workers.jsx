import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List, Image, Grid, Table, Header, Button, Search, Container, Divider, Icon, Modal, Form } from 'semantic-ui-react';

import * as workersActions from '../actions/workersActions';
import '../style.css';

import ReactTable from 'react-table';
import "react-table/react-table.css";

import Toast from './Toast';
import ConfirmComponent from './Confirm';
import { toast } from 'react-toastify';


class Workers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modals: {
                showModalAddWorker: false,
                showModalEditWorker: false
            },
            newWorker: {
                _id: '',
                name: '',
                role: 3
            },
            messages: {
                CRUDWorkers: {
                    show: false,
                    text: '',
                    type: ''
                },
                confirmDelete: {
                    open: false,
                    _id: ''
                }
            },
            rolesOptions: [{
                key: 1,
                text: 'ADMIN',
                value: 1,
            }, {
                key: 2,
                text: 'ON CALL MANAGER',
                value: 2,
            }, {
                key: 3,
                text: 'USER',
                value: 3,
            }],
            workers: []
        };
        this.ReactTableWorkers = this.ReactTableWorkers.bind(this);
        this.ButtonsTableWorkers = this.ButtonsTableWorkers.bind(this);
        this.handleOnChangeDropdownWorkerRole = this.handleOnChangeDropdownWorkerRole.bind(this);
        this.handleOnChangeInputWorkerName = this.handleOnChangeInputWorkerName.bind(this);
        this.handleOnConfirmDeleteWorkers = this.handleOnConfirmDeleteWorkers.bind(this);
    }

    componentDidMount() {
        console.log("WORKERS COMPONENT -- COMPONENT DID MOUNT -- ", this.state.workers)
        this.loadWorkerState();
    }

    loadWorkerState() {
        this.props.loadAllWorkers().then(() => {
            if (Array.isArray(this.props.workers)) {
                this.setState({
                    workers: this.props.workers.filter(item => item.inactive === false)
                }, () => {
                    console.log("WORKERS COMPONENT -- LOAD WORKER TO STATE -- ", this.state.workers)
                });
            }
        });
    }
    ReactTableWorkers(props) {
        console.log("REACT TABLE WORKERS", props)
        return (
            <div>
                <ReactTable
                    //onFetchData={this.props.loadAllWorkers}
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            style: {
                                "whiteSpace": "normal",
                                "display": "flex",
                                "alignItems": "center",
                                "justifyContent": "center"

                            },
                            onClick: (e, handleOriginal) => {
                                if (rowInfo !== undefined && column.id !== "actions") {
                                    console.log("state instance", rowInfo.row)
                                    this.setState({
                                        modals: { ...this.state.modals, showModalEditWorker: true }, newWorker: {
                                            name: rowInfo.row.name,
                                            _id: rowInfo.row._id,
                                            role: rowInfo.row._original.role
                                        }
                                    })
                                }

                                // IMPORTANT! React-Table uses onClick internally to trigger
                                // events like expanding SubComponents and pivots.
                                // By default a custom 'onClick' handler  override this functionality.
                                // If you want to fire the original onClick handler, call the
                                // 'handleOriginal' function.
                                if (handleOriginal) {
                                    handleOriginal();
                                }
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
        if (this.props.onCall.map((item) => props.row.row._id === item._id).includes(true)) {
            return (<div style={{ "width": "100%" }}>
                <Button fluid className="flexboxCenterVerHor" icon='close' onClick={() => {
                    this.setState({
                        messages: {
                            ...this.state.messages, confirmDelete: {
                                _id: props.row.row._id,
                                open: true
                            }
                        }
                    });
                }} />
            </div>)
        } else {
            return (<div style={{ "width": "100%" }}>
                <Button.Group widths='2'>
                    <Button className="flexboxCenterVerHor" icon='bell' onClick={() => this.props.addToOnCall(props.row.row)} />
                    <Button className="flexboxCenterVerHor" icon='close' onClick={() => {
                        this.setState({
                            messages: {
                                ...this.state.messages, confirmDelete: {
                                    _id: props.row.row._id,
                                    open: true
                                }
                            }
                        });
                    }} />
                </Button.Group>
            </div>)
        }
    }

    handleModalClose = (name) => this.setState({
        modals: { ...this.state.modals, [name]: false }, newWorker: {
            _id: '',
            name: '',
            role: 3
        }
    });

    handleOnChangeDropdownWorkerRole(e, { value }) {
        console.log('CHANGIN THE DROPDOWN', value)
        this.setState({ newWorker: { ...this.state.newWorker, role: value } });
    }

    handleOnChangeInputWorkerName(e, { value }) {
        console.log('CHANGIN THE INPUT', value)
        this.setState({ newWorker: { ...this.state.newWorker, name: value } });
    }

    handleChangeMessages(value, type) {
        this.setState((prevState, props) => {
            console.log("handleChangesMessages calendar prueba value", value)
            return { messages: { ...prevState.messages, CRUDWorkers: { ...prevState.messages.CRUDWorkers, text: value, show: true, type } } }

        }, () => {
            this.setState((prevState, props) => {
                console.log('handleChangesMessages calendar', value, this.state);
                return { messages: { ...prevState.messages, CRUDWorkers: { ...prevState.messages.CRUDWorkers, text: value, show: false, type } } }
            })
        });
    }

    handleOnConfirmDeleteWorkers = () => {
        //this.props.deleteWorker(this.state.messages.confirmDelete._id);
        this.props.deleteWorker(this.state.messages.confirmDelete._id)
        this.props.removeFromOnCall(this.state.messages.confirmDelete._id);
        this.handleChangeMessages("Worker deleted successfully", toast.TYPE.SUCCESS);
        this.loadWorkerState();
       
    }

    handleOnCloseDeleteWorkers = () => {
        this.setState({
            messages: {
                ...this.state.messages, confirmDelete: {
                    open: false,
                    _id: ''
                }
            }
        });
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
                id: "_id",
                accessor: d => d._id,
            },
            {
                filterable: false,
                id: "actions",
                Cell: row => (
                    <Button fluid icon='bell slash' onClick={() => this.props.removeFromOnCall(row.row._id)} />
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
                id: "_id",
                accessor: d => d._id,
            },
            {
                filterable: false,
                id: "actions",
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
                                <Button floated="left" onClick={() => this.setState({ modals: { ...this.state.modals, showModalAddWorker: true } })}>Add new worker</Button>
                                <Button floated="right" onClick={() => this.props.addWorker({ _id: Math.random(), name: 'Manuel Lorenzo' + Math.random() * 100, role: 'Admin' })}>Add employee</Button>
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
                                    <this.ReactTableWorkers data={this.state.workers} columns={columnWorkers} />
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
                <Modal
                    open={this.state.modals.showModalAddWorker}
                    onClose={() => this.handleModalClose("showModalAddWorker")}
                    size='tiny'
                    closeOnRootNodeClick={false}
                >
                    <Header icon='browser' content='Add Worker' />
                    <Modal.Content>
                        <Form>
                            <Form.Field >
                                <Form.Input placeholder='Name' onChange={this.handleOnChangeInputWorkerName} value={this.state.newWorker.name} fluid />
                            </Form.Field>
                            <Form.Field>
                                <Form.Dropdown placeholder='Role' onChange={this.handleOnChangeDropdownWorkerRole} value={this.state.newWorker.role} fluid search selection options={this.state.rolesOptions} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => {
                            this.handleModalClose("showModalAddWorker")
                        }}>Close</Button>
                        <Button floated="right" disabled={this.state.newWorker.name === ''} onClick={() => {
                            this.props.addWorker({ ...this.state.newWorker, _id: Math.random(), inactive: false, onCall: false }).then(() => {
                                console.log("WORKERS -- MODAL -- ADD WORKER RESULT");
                                this.handleModalClose("showModalAddWorker")
                                this.handleChangeMessages("Worker added successfully", toast.TYPE.SUCCESS);
                                this.loadWorkerState();
                                //this.handleChangeMessages("ERROR: Worker not added", toast.TYPE.ERROR);
                            });
                        }}>Add event</Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    open={this.state.modals.showModalEditWorker}
                    onClose={() => this.handleModalClose("showModalEditWorker")}
                    size='tiny'
                    closeOnRootNodeClick={false}
                >
                    <Header icon='browser' content='Edit Worker' />
                    <Modal.Content>
                        <Form>
                            <Form.Field >
                                <Form.Input placeholder='Name' onChange={this.handleOnChangeInputWorkerName} value={this.state.newWorker.name} fluid />
                            </Form.Field>
                            <Form.Field>
                                <Form.Dropdown placeholder='Role' onChange={this.handleOnChangeDropdownWorkerRole} value={this.state.newWorker.role} fluid search selection options={this.state.rolesOptions} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => {
                            this.handleModalClose("showModalEditWorker")
                        }}>Close</Button>
                        <Button floated="right" disabled={this.state.newWorker.name === ''} onClick={() => {
                            this.props.editWorker(this.state.newWorker).then(() => {
                                this.handleModalClose("showModalEditWorker");
                                this.handleChangeMessages("Worker edited successfully", toast.TYPE.SUCCESS);
                                this.loadWorkerState();
                            });

                        }}>Edit event</Button>
                    </Modal.Actions>
                </Modal>
                <Toast message={this.state.messages.CRUDWorkers.text} show={this.state.messages.CRUDWorkers.show} type={this.state.messages.CRUDWorkers.type} />
                <ConfirmComponent
                    show={this.state.messages.confirmDelete.open}
                    onConfirm={this.handleOnConfirmDeleteWorkers}
                    onClose={this.handleOnCloseDeleteWorkers} />
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
        loadAllWorkers: () => dispatch(workersActions.loadWorkers()),
        editWorker: worker => dispatch(workersActions.editWorker(worker)),
        addWorker: worker => dispatch(workersActions.addWorker(worker)),
        deleteWorker: _id => dispatch(workersActions.deleteWorker(_id)),
        addToOnCall: worker => dispatch(workersActions.addToOnCall(worker)),
        removeFromOnCall: _id => dispatch(workersActions.removeFromOnCall(_id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Workers);