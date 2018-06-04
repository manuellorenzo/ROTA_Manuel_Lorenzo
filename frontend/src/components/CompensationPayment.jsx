import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Form, Button, Icon, Modal, Header, Divider, Checkbox, Select, Input } from 'semantic-ui-react';

import ReactTable from 'react-table';
import "react-table/react-table.css";

import * as compensationAction from '../actions/compensationAction';
import * as eventAction from '../actions/calendarActions'
import * as configurationsActions from '../actions/configurationsActions';

import { formatDate, compareHours } from '../global_functions/global_function'
import moment from "moment";
import _ from 'lodash';

class CompensationPayment extends Component {

    constructor(props) {
        super(props);

        //formatDate(this.props.compensations.dateCompensation);

        this.handleSeeCompensationsButton = this.handleSeeCompensationsButton.bind(this);
        this.handleMoneyButton = this.handleMoneyButton.bind(this);

        this.state = {
            compensations: [],
            events: [],
            config: [],
            editCompensation: [],
            modalOpen: false,
            workerId: '',
            payment: 0
        }
    }

    handleOpen = (e) => {
        console.log('click modal=>', e);
        this.setState({ modalOpen: true })
    }

    handleClose = () => this.setState({ modalOpen: false })

    componentDidMount() {
        console.log("COMPENSATIONSPAYMENT COMPONENT -- COMPONENT DID MOUNT -- ", this.props.config)
        this.loadConfigState();
        this.loadEventsState();
    }

    loadEventsState() {
        this.props.loadEventsByWorker('5b03ed9685c16d306c24cdeb').then((result) => {
            Promise.all(_.flatten(result.data.map(event => {
                return event.compensations.map(idCompen => {
                    return { idCompen, startDate: event.start }
                })
            }))
                .map(formattedCompen => this.props.getCompensationById(formattedCompen.idCompen).then(response => {
                    return { startDate: formattedCompen.startDate, compenData: response.data }
                })))
                .then(compensations => {
                    return compensations.map(compensation => {
                        return { startDate: compensation.startDate, compenData: compensation.compenData.compensation }
                    });
                }).then(compensationsArray => this.setState({ compensations: compensationsArray }, () => console.log('COMPENSATIONS COMPONENT -- COMPENSATIONS STATE -- ', this.state.compensations)))
        })
    }

    loadConfigState() {
        this.props.loadAllConfig().then(() => {
            this.setState({
                config: this.props.config
            }, () => console.log('Config Array es array', this.state))
        })
    }

    handleSeeCompensationsButton() {
        this.props.loadCompensationByWorker('5b03ed9685c16d306c24cdeb');
        console.log('Compensaciones filtradas=>', this.props.compensationsFilter)
    }

    handleMoneyButton = () => {
        const startDateDayNumber = moment(this.state.editCompensation.startDate).isoWeekday();
        const weekDay = startDateDayNumber <= 4;
        const afterNightTime = false;
        const nightStartTime = this.getTime(moment(this.props.config.nightStartTime, "HH:mm"));
        const nightEndTime = this.getTime(moment(this.props.config.nightEndTime, "HH:mm"));
        const startTime = this.getTime(moment(this.state.editCompensation.compenData.startTime));
        console.log('COMPENSATIONS COMPONENT -- Configuración => ', startTime.isBefore(nightEndTime));
    }

    getTime(dateTime) {
        console.log("COMPENSATIONS COMPONENT -- GET TIME -- ", dateTime.hours(), dateTime.minutes());
        return moment({ h: dateTime.hours(), m: dateTime.minutes() });
    }

    handleTimeButton = () => {

    }

    render() {
        return (
            <Grid columns={2}>
                <Grid.Row centered>
                    <Grid.Column>
                        <Header as="h3">Compensations</Header>
                        <Divider />
                        <ReactTable
                            filterable
                            getTdProps={(state, rowInfo, column, instance) => {
                                return {
                                    style: {
                                        "whiteSpace": "normal",
                                        "display": "flex",
                                        "alignItems": "center",
                                        "justifyContent": "center"

                                    },
                                    onClick: (e, handleOriginal) => {
                                        console.log(rowInfo.original)
                                        this.setState({ editCompensation: rowInfo.original })
                                    }
                                };
                            }}
                            data={this.state.compensations}
                            columns={[
                                {
                                    Header: "Compensation payment",
                                    columns: [
                                        {
                                            Header: "Fecha compensacion",
                                            id: 'dateCompensation',
                                            accessor: d => formatDate(d.startDate)
                                        },

                                        {
                                            Header: "Duración tarea",
                                            id: 'duration',
                                            accessor: d => d.compenData.duration
                                        },
                                        {
                                            filterable: false,
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
                                                            <Button onClick={this.handleMoneyButton}>Money</Button>
                                                            <Button.Or />
                                                            <Button positive>Time</Button>
                                                        </Button.Group>
                                                        <span>{this.state.payment}</span>
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
        events: state.calendarReducer.eventWorker,

        //CONFIG
        config: state.configurationsReducer.configCompensations
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        //COMPENSACIONES
        loadAllCompensations: () => dispatch(compensationAction.loadAllCompensations()),
        loadCompensationByWorker: worker => dispatch(compensationAction.loadCompensationByWorker(worker)),
        editCompensations: _id => dispatch(compensationAction.editCompensation(_id)),
        getCompensationById: _id => dispatch(compensationAction.getCompensationById(_id)),

        //EVENTOS
        loadEventsByWorker: workerId => dispatch(eventAction.findEventsByWorker(workerId)),

        //CONFIG
        loadAllConfig: () => dispatch(configurationsActions.loadConf())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompensationPayment);
