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
        }else if(isNightTime){
            let afNtWeekMoneyMult = this.props.config.afNtWeekMoneyMult;
            finalMoney = onCallWeekMoney + (duration * afNtWeekMoneyMult);
        }else if(isWeekend){
            let bfNtWeekendMoneyMult = this.props.config.bfNtWeekendMoneyMult;
            finalMoney = onCallWeekendMoney + (duration * bfNtWeekendMoneyMult);
        }else{
            let bfNtWeekMoneyMult = this.props.config.bfNtWeekMoneyMult;
            finalMoney = onCallWeekMoney + (duration * bfNtWeekMoneyMult);
        }
        console.log('COMPENSATIONS COMPONENT -- Configuración => ', isNightTime, isWeekend, finalMoney);
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
                                        if(rowInfo !== undefined){
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
