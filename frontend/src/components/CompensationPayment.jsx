import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Form, Button, Icon, Modal, Header } from 'semantic-ui-react';

import ReactTable from 'react-table';
import "react-table/react-table.css";

import * as compensationAction from '../actions/compensationAction';
import * as eventAction from '../actions/calendarActions'
import * as configurationsActions from '../actions/configurationsActions';

import { formatDate, compareHours } from '../global_functions/global_function'
import moment from "moment";

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
            workerId: ''
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
        this.loadCompensationState();

    }



    loadCompensationState() {
        this.props.loadCompensationByWorker('5b03ed9685c16d306c24cdeb').then(() => {
            if (Array.isArray(this.props.compensations)) {
                console.log('Array es array')
                this.setState({
                    compensations: this.props.compensationsFilter
                });
            }
        });
    }

    loadEventsState() {
        this.props.loadEventByWorker('5b03ed9685c16d306c24cdeb').then(() => {
            if (Array.isArray(this.props.events)) {
                console.log('Event array es array');
                this.setState({
                    events: this.props.events
                })
            }
        })
    }

    loadConfigState() {
        this.props.loadAllConfig().then(() => {
            if (Array.isArray(this.props.config)) {
                console.log('Config Array es array', console.log(this.props.configCompensations))
                this.setState({
                    config: this.props.configCompensations
                })
            }
        })
    }

    handleSeeCompensationsButton() {
        this.props.loadCompensationByWorker('5b03ed9685c16d306c24cdeb');
        console.log('Compensaciones filtradas=>', this.props.compensationsFilter)
    }

    handleMoneyButton = () => {
        console.log('Configuración => ',this.props.config, this.state.editCompensation)
        const moneyWeekend = this.props.config.onCallWeekendMoney;
        const moneyWeek = this.props.config.onCallWeekMoney;
        const weekDay = moment(this.state.editCompensation.startTime).isoWeekday();
        const hour = moment(new Date(this.state.editCompensation.startTime));
        const startTime = moment('09:00 pm', "HH:mm a");
        let moneyFinal = 1;
        console.log('moneyFinal1', moneyFinal)
        if (weekDay < 5) {
            if (compareHours(hour)>compareHours(startTime)) {
                console.log('Después de las nueve, dia entre semana')
                moneyFinal=moneyWeek*this.props.config.afNtWeekMoneyMult;
            } else {
                console.log('Antes de las nueve, dia entre semana')
                moneyFinal=moneyWeek*this.props.config.bfNtWeekMoneyMult;

            }
        }else{
            if (compareHours(hour)>compareHours(startTime)) {
                console.log('Después de las nueve, fin de semana')
                moneyFinal=moneyWeekend*this.props.config.afNtWeekendMoneyMult;
            } else {
                console.log('Antes de las nueve, fin de semana')
                moneyFinal=moneyWeekend*this.props.config.bfNtWeekendMoneyMult;
            }
        }
        console.log('moneyFinal2', moneyFinal, moneyWeek,this.props.config.afNtWeekMoneyMult)
        this.setState({
            editCompensation: {
                ...this.state.editCompensation,
                payment: { ...this.state.editCompensation.payment, amount: moneyFinal, type: 'money', date:new Date() }
            }
        }, () => {
            console.log('compensacion justoi antes de ser modificada',this.state.editCompensation)
            this.props.editCompensations(this.state.editCompensation);
        })

    }

    handleTimeButton=()=>{
        
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
                            getTdProps={(state, rowInfo, column, instance) => {
                                return {
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
                                            accessor: d => formatDate(d.startTime)
                                        },

                                        {
                                            Header: "Duración tarea",
                                            accessor: "duration",
                                        },
                                        {
                                            Header: 'Cobrar',
                                            accessor: 'payment._id',
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

        //EVENTOS
        loadEventByWorker: workerId => dispatch(eventAction.findEventByWorker(workerId)),

        //CONFIG
        loadAllConfig: () => dispatch(configurationsActions.loadConf())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompensationPayment);
