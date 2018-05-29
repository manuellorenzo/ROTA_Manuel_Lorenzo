import React, { Component } from 'react';
import { Input, Button, Grid, Form, Image, Menu, Container, Header, Divider, Table } from 'semantic-ui-react'
import { connect } from 'react-redux';

//import TimePicker from 'react-bootstrap-time-picker';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import history from '../history';

import ReactTable from 'react-table';
import "react-table/react-table.css";

import * as configurationsActions from '../actions/configurationsActions';

class Configuration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //ON CALL MONEY
            onCallWeekMoney: "1",
            onCallWeekendMoney: "1",
            //WEEK
            bfNtWeekMoneyMult: "1",
            afNtWeekMoneyMult: "1",
            bfNtWeekTimeMult: "1",
            afNtWeekTimeMult: "1",
            //WEEKEND
            bfNtWeekendMoneyMult: "1",
            afNtWeekendMoneyMult: "1",
            bfNtWeekendTimeMult: "1",
            afNtWeekendTimeMult: "1",
            //TIME
            nightEndTime: "13:00",
            nightStartTime: "13:00",
        };
        this.handleNightStartTimeChange = this.handleNightStartTimeChange.bind(this);
        this.handleNightEndTimeChange = this.handleNightEndTimeChange.bind(this);

    }

    handleNightStartTimeChange(nightStartTime) {
        console.log(nightStartTime);     // <- prints "3600" if "01:00" is picked
        this.setState({ nightStartTime: nightStartTime.format("HH:mm") });
    }

    handleNightEndTimeChange(nightEndTime) {
        console.log(nightEndTime);     // <- prints "3600" if "01:00" is picked
        this.setState({ nightEndTime: nightEndTime.format("HH:mm") });
    }

    componentDidMount() {
        //ACTUALIZAR REDUX CON LOS DATOS DE LA API
        console.log("componentDidMount", this.props.compensations)
        this.props.loadAllConf().then(() =>
            this.setState((prevState, props) => {
                return props.compensations
            }, () => {
                /*Object.keys(this.state).map((key) => {
                    console.log("Compensation state",{[key]:this.state[key]});
                })*/
            }));
    }

    componentWillReceiveProps(props) {
        console.log("PROPS", props);
        this.setState(
            props.compensations
        )
    }

    handleChange = (e, { name, value }) => {
        if (value < 0) {
            value = 0;
        }
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        const { onCallWeekMoney, onCallWeekendMoney,
            bfNtWeekMoneyMult, afNtWeekMoneyMult, bfNtWeekTimeMult, afNtWeekTimeMult,
            bfNtWeekendMoneyMult, afNtWeekendMoneyMult, bfNtWeekendTimeMult, afNtWeekendTimeMult,
            nightEndTime, nightStartTime } = this.state
        this.props.editConf({ ...this.state, _id: this.props.compensations._id });
        /*//ON CALL MONEY
        this.props.changeOnCallWeekMoney(onCallWeekMoney);
        this.props.changeOnCallWeekendMoney(onCallWeekendMoney);

        //WEEK
        this.props.changeBeforeNTWeekMoneyMult(bfNtWeekMoneyMult);
        this.props.changeAfterNTWeekMoneyMult(afNtWeekMoneyMult);
        this.props.changeBeforeNTWeekTimeMult(bfNtWeekTimeMult);
        this.props.changeAfterNTWeekTimeMult(afNtWeekTimeMult);

        //WEEKEND
        this.props.changeBeforeNTWeekendMoneyMult(bfNtWeekendMoneyMult);
        this.props.changeAfterNTWeekendMoneyMult(afNtWeekendMoneyMult);
        this.props.changeBeforeNTWeekendTimeMult(bfNtWeekendTimeMult);
        this.props.changeAfterNTWeekendTimeMult(afNtWeekendTimeMult);

        //TIME
        this.props.changeNightEndTime(nightEndTime);
        this.props.changeNightStartTime(nightStartTime);*/
    }

    handleBlur = (e) => {
        if (e.target.value === "") {
            e.target.value = 0;
        }
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {

        return (
            <div>
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Form>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Header as="h3">Compensations</Header>
                                                <Divider />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={8} floated="left">
                                                <Form.Field >
                                                    <Form.Input label="On Call Base Weekend Money" name="onCallWeekMoney" type='number' min={0} placeholder="On Call Base Week Money"
                                                        value={this.state.onCallWeekMoney} onChange={this.handleChange} onBlur={this.handleBlur} />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column width={8} floated="right">
                                                <Form.Field>
                                                    <Form.Input label="On Call Base Weekend Money" name="onCallWeekendMoney" type='number' placeholder="On Call Base Weekend Money" value={this.state.onCallWeekendMoney}
                                                        onChange={this.handleChange} onBlur={this.handleBlur} />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Table definition>
                                                <Table.Header>
                                                    <Table.Row>
                                                        <Table.HeaderCell />
                                                        <Table.HeaderCell>Money</Table.HeaderCell>
                                                        <Table.HeaderCell>Time</Table.HeaderCell>
                                                    </Table.Row>
                                                </Table.Header>

                                                <Table.Body>
                                                    <Table.Row>
                                                        <Table.Cell>Before Night Time Week</Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input name="bfNtWeekMoneyMult" type='number' placeholder="Before Night Week Money" value={this.state.bfNtWeekMoneyMult}
                                                                onChange={this.handleChange} onBlur={this.handleBlur} />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input name="bfNtWeekTimeMult" type='number' placeholder="Before Night Week Time" value={this.state.bfNtWeekTimeMult}
                                                                onChange={this.handleChange} onBlur={this.handleBlur} />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                    <Table.Row>
                                                        <Table.Cell>After Night Time Week</Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input name="afNtWeekMoneyMult" type='number' placeholder="After Night Week Money" value={this.state.afNtWeekMoneyMult}
                                                                onChange={this.handleChange} onBlur={this.handleBlur} />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input name="afNtWeekTimeMult" type='number' placeholder="After Night Week Time" value={this.state.afNtWeekTimeMult}
                                                                onChange={this.handleChange} onBlur={this.handleBlur} />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                    <Table.Row>
                                                        <Table.Cell>Before Night Time Weekend</Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input name="bfNtWeekendMoneyMult" type='number' placeholder="Before Night Weekend Money" value={this.state.bfNtWeekendMoneyMult}
                                                                onChange={this.handleChange} onBlur={this.handleBlur} />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input name="bfNtWeekendTimeMult" type='number' placeholder="Before Night Weekend Time" value={this.state.bfNtWeekendTimeMult}
                                                                onChange={this.handleChange} onBlur={this.handleBlur} />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                    <Table.Row>
                                                        <Table.Cell>After Night Time Weekend</Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input name="afNtWeekendMoneyMult" type='number' placeholder="After Night Weekend Money" value={this.state.afNtWeekendMoneyMult}
                                                                onChange={this.handleChange} onBlur={this.handleBlur} />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input name="afNtWeekendTimeMult" type='number' placeholder="After Night Weekend Time" value={this.state.afNtWeekendTimeMult}
                                                                onChange={this.handleChange} onBlur={this.handleBlur} />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                </Table.Body>
                                            </Table>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h3">Time configuration</Header>
                                <Divider />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={8} floated="left">
                                                <Form.Field>
                                                    <label>Night Start Time</label>
                                                    <TimePicker style={{ width: "100%" }} value={moment(this.state.nightStartTime, 'HH:mm')}
                                                        onChange={this.handleNightStartTimeChange} format={"HH:mm"} allowEmpty={false} inputReadOnly />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column width={8} floated="right">
                                                <Form.Field>
                                                    <label>Night End Time</label>
                                                    <TimePicker style={{ width: "100%" }} value={moment(this.state.nightEndTime, 'HH:mm')}
                                                        onChange={this.handleNightEndTimeChange} format={"HH:mm"} allowEmpty={false} inputReadOnly />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Button floated="right" primary type="submit" onClick={() => {
                                                    this.handleSubmit()
                                                }}>Save changes</Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
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
        compensations: state.configurationsReducer.configCompensations
    }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        loadAllConf: () => dispatch(configurationsActions.loadConf()),
        editConf: newConf => dispatch(configurationsActions.editConf(newConf)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);