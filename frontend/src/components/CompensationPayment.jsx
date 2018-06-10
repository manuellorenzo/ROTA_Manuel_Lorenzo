import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Form, Button, Icon, Modal, Header, Divider, Checkbox, Select, Input } from 'semantic-ui-react';

import ReactTable from 'react-table';
import "react-table/react-table.css";

import * as compensationAction from '../actions/compensationAction';
import * as eventAction from '../actions/calendarActions'
import * as configurationsActions from '../actions/configurationsActions';
import * as workersActions from '../actions/workersActions';

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
            payment: {
                value: 0,
                type: ''
            },
            workersOptions: []
        }
    }

    handleOpen = (e) => {
        console.log('click modal=>', e);
        this.setState({ modalOpen: true })
    }

    handleClose = () => this.setState({ modalOpen: false, payment: { value: 0, type: '' } })

    componentDidMount() {
        console.log("COMPENSATIONSPAYMENT COMPONENT -- COMPONENT DID MOUNT -- ", this.props.config)
        this.loadConfigState();
        //this.loadEventsState();
        this.loadWorkersState();
    }

    loadEventsState(workerId) {
        this.props.loadEventsByWorker(workerId).then((result) => {
            //Obtenemos los eventos por trabajador y por cada evento, sacamos el id de sus compensaciones y la fecha del evento
            //_.flatten se utiliza para evitar que se nos genere un array con demasiadas profundidades
            Promise.all(_.flatten(result.data.map(event => {
                return event.compensations.map(idCompen => {
                    return { idCompen, startDate: event.start }
                })
            }))
                //Por cada id de compensación sacado, conseguimos el objecto completo y lo cargamos en el array
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

    loadWorkersState = () => {
        this.props.loadAllWorkers().then(() => {
            this.setState({
                workersOptions: this.props.workers.filter((item) => item.inactive === false).map((itemMap) => {
                    return {
                        key: itemMap._id,
                        text: itemMap.name,
                        value: itemMap._id,
                    }
                })
            });
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
        const startTime = moment(this.state.editCompensation.startDate)
            .set({
                hour: moment(new Date(this.state.editCompensation.compenData.startTime)).get('hour'),
                minute: moment(new Date(this.state.editCompensation.compenData.startTime)).get('minute')
            });
        const nightStartTime = moment(this.state.editCompensation.startDate)
            .set({
                hour: moment(this.props.config.nightStartTime, "HH:mm").get('hour'),
                minute: moment(this.props.config.nightStartTime, "HH:mm").get('minute')
            });
        const nightEndTime = moment(this.state.editCompensation.startDate)
            .set({
                hour: moment(this.props.config.nightEndTime, "HH:mm").get('hour'),
                minute: moment(this.props.config.nightEndTime, "HH:mm").get('minute')
            });
        const duration = this.state.editCompensation.compenData.duration;
        const onCallWeekendMoney = this.props.config.onCallWeekendMoney;
        const onCallWeekMoney = this.props.config.onCallWeekMoney;

        if (nightEndTime.isBefore(nightStartTime)) {
            nightEndTime.add(1, 'day');
        }
        let isNightTime = startTime.isBetween(nightStartTime, nightEndTime);
        let isWeekend = startDateDayNumber >= 5;
        let finalMoney = 0;
        if (isNightTime && isWeekend) {
            let afNtWeekendMoneyMult = this.props.config.afNtWeekendMoneyMult;
            finalMoney = onCallWeekendMoney + (duration * afNtWeekendMoneyMult);
        } else if (isNightTime) {
            let afNtWeekMoneyMult = this.props.config.afNtWeekMoneyMult;
            finalMoney = onCallWeekMoney + (duration * afNtWeekMoneyMult);
        } else if (isWeekend) {
            let bfNtWeekendMoneyMult = this.props.config.bfNtWeekendMoneyMult;
            finalMoney = onCallWeekendMoney + (duration * bfNtWeekendMoneyMult);
        } else {
            let bfNtWeekMoneyMult = this.props.config.bfNtWeekMoneyMult;
            finalMoney = onCallWeekMoney + (duration * bfNtWeekMoneyMult);
        }
        this.setState({ payment: { value: finalMoney, type: 'euros' } })
    }

    handleTimeButton = () => {
        const startDateDayNumber = moment(this.state.editCompensation.startDate).isoWeekday();
        const startTime = moment(this.state.editCompensation.startDate)
            .set({
                hour: moment(new Date(this.state.editCompensation.compenData.startTime)).get('hour'),
                minute: moment(new Date(this.state.editCompensation.compenData.startTime)).get('minute')
            });
        const nightStartTime = moment(this.state.editCompensation.startDate)
            .set({
                hour: moment(this.props.config.nightStartTime, "HH:mm").get('hour'),
                minute: moment(this.props.config.nightStartTime, "HH:mm").get('minute')
            });
        const nightEndTime = moment(this.state.editCompensation.startDate)
            .set({
                hour: moment(this.props.config.nightEndTime, "HH:mm").get('hour'),
                minute: moment(this.props.config.nightEndTime, "HH:mm").get('minute')
            });
        const duration = this.state.editCompensation.compenData.duration;
        const onCallWeekendMoney = this.props.config.onCallWeekendMoney;
        const onCallWeekMoney = this.props.config.onCallWeekMoney;

        if (nightEndTime.isBefore(nightStartTime)) {
            nightEndTime.add(1, 'day');
        }
        let isNightTime = startTime.isBetween(nightStartTime, nightEndTime);
        let isWeekend = startDateDayNumber >= 5;
        let finalMoney = 0;
        if (isNightTime && isWeekend) {
            let afNtWeekendTimeMult = this.props.config.afNtWeekendTimeMult;
            finalMoney = onCallWeekendMoney + (duration * afNtWeekendTimeMult);
        } else if (isNightTime) {
            let afNtWeekTimeMult = this.props.config.afNtWeekTimeMult;
            finalMoney = onCallWeekMoney + (duration * afNtWeekTimeMult);
        } else if (isWeekend) {
            let bfNtWeekendTimeMult = this.props.config.bfNtWeekendTimeMult;
            finalMoney = onCallWeekendMoney + (duration * bfNtWeekendTimeMult);
        } else {
            let bfNtWeekTimeMult = this.props.config.bfNtWeekTimeMult;
            finalMoney = onCallWeekMoney + (duration * bfNtWeekTimeMult);
        }
        this.setState({ payment: { value: finalMoney, type: 'hours' } })
    }

    handleAddPayment = () => {
        console.log("COMPENSATIONS COMPONENT ADD PAYMENT")
        this.props.editCompensation({
            ...this.state.editCompensation.compenData, 'payment': {
                'amount': this.state.payment.value,
                'type': this.state.payment.type === 'hours' ? 'time' : 'money',
                'date': moment()
            }
        }).then(() => this.setState({ 'modalOpen': false, 'payment': { 'value': 0, 'type': '' } }, () => this.loadEventsState()));
    }

    handleOnChangeDeveloperSelection = (e, { value }) => {
        this.setState({ workerId: value }, () =>{
            this.loadEventsState(this.state.workerId);
        });
    }

    render() {
        return (
            <Grid columns={2}>
                <Grid.Row centered>
                    <Grid.Column>
                        <Header as="h3">Compensations</Header>
                        <Divider />
                        <Form>
                            <Form.Field >
                                <label>Developer</label>
                                <Form.Dropdown placeholder='Worker' onChange={this.handleOnChangeDeveloperSelection} fluid search selection options={this.state.workersOptions} />
                            </Form.Field>
                        </Form>
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
                                        if (rowInfo !== undefined) {
                                            console.log(rowInfo.original)
                                            this.setState({ editCompensation: rowInfo.original })
                                        }
                                    }
                                };
                            }}
                            data={this.state.compensations}
                            columns={[
                                {
                                    Header: "Compensation payment",
                                    columns: [
                                        {
                                            Header: "Date",
                                            id: 'dateCompensation',
                                            accessor: d => formatDate(d.startDate)
                                        },

                                        {
                                            Header: "Duration",
                                            id: 'duration',
                                            accessor: d => d.compenData.duration
                                        },
                                        {
                                            filterable: false,
                                            Cell: row => {
                                                console.log("COMPENSATIONS PAYMENT COMPONENT -- ROW ORIGINAL ", row.original);
                                                if (row.original.compenData.payment.type === '') {
                                                    return (
                                                        <Modal
                                                            trigger={<Button onClick={this.handleOpen}>Pay</Button>}
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
                                                                    <Button positive onClick={this.handleTimeButton}>Time</Button>
                                                                </Button.Group>
                                                                {this.state.payment.type !== '' ? <span>    {this.state.payment.value} {this.state.payment.type}</span> : null}
                                                            </Modal.Content>
                                                            <Modal.Actions>
                                                                <Button color='red' onClick={this.handleClose} inverted>
                                                                    <Icon name='remove' /> Close
                                                                </Button>
                                                                <Button disabled={this.state.payment.type === ''} onClick={this.handleAddPayment}>
                                                                    <Icon name='add' /> Accept
                                                                </Button>
                                                            </Modal.Actions>
                                                        </Modal>
                                                    )
                                                } else {
                                                    return <p>{row.original.compenData.payment.amount} {row.original.compenData.payment.type === 'time' ? 'hours' : 'euros'}</p>
                                                }
                                            }
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
        config: state.configurationsReducer.configCompensations,

        //WORKERS
        workers: state.workersReducer.workers,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        //COMPENSACIONES
        loadAllCompensations: () => dispatch(compensationAction.loadAllCompensations()),
        loadCompensationByWorker: worker => dispatch(compensationAction.loadCompensationByWorker(worker)),
        editCompensation: _id => dispatch(compensationAction.editCompensation(_id)),
        getCompensationById: _id => dispatch(compensationAction.getCompensationById(_id)),

        //EVENTOS
        loadEventsByWorker: workerId => dispatch(eventAction.findEventsByWorker(workerId)),

        //CONFIG
        loadAllConfig: () => dispatch(configurationsActions.loadConf()),

        //WORKERS
        loadAllWorkers: () => dispatch(workersActions.loadWorkers()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompensationPayment);
