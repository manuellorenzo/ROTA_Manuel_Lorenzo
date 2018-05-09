import React, { Component } from 'react';
import { Input, Button, Grid, Form, Image, Menu, Container, Header, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux';

//import TimePicker from 'react-bootstrap-time-picker';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import history from '../history';

import * as compensationsActions from '../actions/compensationsActions';

class ConfigurationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nightEndTime: moment(),
            nightStartTime: moment(),
            baseMoney: "1",
            baseTime: "1",
            moneyMult: "1",
            timeMult: "1",
            weekMoney: "1",
            weekendMoney: "1"
        };
        this.handleNightStartTimeChange = this.handleNightStartTimeChange.bind(this);
        this.handleNightEndTimeChange = this.handleNightEndTimeChange.bind(this);

    }

    handleNightStartTimeChange(nightStartTime) {
        console.log(nightStartTime);     // <- prints "3600" if "01:00" is picked
        this.setState({ nightStartTime });
    }

    handleNightEndTimeChange(nightEndTime) {
        console.log(nightEndTime);     // <- prints "3600" if "01:00" is picked
        this.setState({ nightEndTime });
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.setState(this.props.compensations)
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
        const { baseMoney, baseTime, moneyMult, timeMult, weekMoney, weekendMoney, nightStartTime, nightEndTime } = this.state
        this.props.changeBaseMoney(baseMoney);
        this.props.changeBaseTime(baseTime);
        this.props.changeMoneyMult(moneyMult);
        this.props.changeTimeMult(timeMult);
        this.props.changeWeekMoney(weekMoney);
        this.props.changeWeekendMoney(weekendMoney);
        this.props.changeNightEndTime(nightEndTime);
        this.props.changeNightStartTime(nightStartTime);
    }

    handleBlur = (e) => {
        if (e.target.value === "") {
            e.target.value = 1;
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
                                <Header as="h2">Compensations</Header>
                                <Divider />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={8} floated="left">
                                                <Form.Field >
                                                    <Form.Input label="Base money" name="baseMoney" type='number' min={0} placeholder="Base money"
                                                        value={this.state.baseMoney} onChange={this.handleChange} onBlur={this.handleBlur} />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column width={8} floated="right">
                                                <Form.Field>
                                                    <Form.Input label="Base time" name="baseTime" type='number' placeholder="Base time" value={this.state.baseTime}
                                                        onChange={this.handleChange} onBlur={this.handleBlur} />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={8} floated="left">
                                                <Form.Field >
                                                    <Form.Input label="Money multiplier" name="moneyMult" type='number' placeholder="Money multiplier" value={this.state.moneyMult}
                                                        onChange={this.handleChange} onBlur={this.handleBlur} />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column width={8} floated="right">
                                                <Form.Field>
                                                    <Form.Input label="Money multiplier" name="timeMult" type='number' placeholder="Time multiplier" value={this.state.timeMult}
                                                        onBlur={this.handleBlur} onChange={this.handleChange} />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={8} floated="left">
                                                <Form.Field >
                                                    <Form.Input label="Week money" name="weekMoney" type='number' placeholder="Week money" value={this.state.weekMoney}
                                                        onBlur={this.handleBlur} onChange={this.handleChange} />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column width={8} floated="right">
                                                <Form.Field>
                                                    <Form.Input label="Weekend money" name="weekendMoney" type='number' placeholder="Weekend money" value={this.state.weekendMoney}
                                                        onBlur={this.handleBlur} onChange={this.handleChange} />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h2">Time configuration</Header>
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
                                                    <TimePicker style={{width: "100%"}} value={moment(this.state.nightStartTime, 'HH:mm')} 
                                                    onChange={this.handleNightStartTimeChange} format={"HH:mm"} allowEmpty={false} inputReadOnly/>
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column width={8} floated="right">
                                                <Form.Field>
                                                    <label>Night End Time</label>
                                                    <TimePicker style={{width: "100%"}} value={moment(this.state.nightEndTime, 'HH:mm')} 
                                                    onChange={this.handleNightEndTimeChange} format={"HH:mm"} allowEmpty={false} inputReadOnly/>
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
        compensations: state.compensationsReducer.compensations
    }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        // You can now say this.props.createBook
        changeBaseMoney: newValue => dispatch(compensationsActions.changeBaseMoney(newValue)),
        changeBaseTime: newValue => dispatch(compensationsActions.changeBaseTime(newValue)),
        changeMoneyMult: newValue => dispatch(compensationsActions.changeMoneyMult(newValue)),
        changeTimeMult: newValue => dispatch(compensationsActions.changeTimeMult(newValue)),
        changeWeekMoney: newValue => dispatch(compensationsActions.changeWeekMoney(newValue)),
        changeWeekendMoney: newValue => dispatch(compensationsActions.changeWeekendMoney(newValue)),
        changeNightStartTime: newValue => dispatch(compensationsActions.changeNightStartTime(newValue)),
        changeNightEndTime: newValue => dispatch(compensationsActions.changeNightEndTime(newValue)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage);