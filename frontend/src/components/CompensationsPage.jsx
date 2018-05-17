import React, { Component } from 'react';
import { Input, Button, Grid, Form, Image, Menu, Container, Header, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux';

//import TimePicker from 'react-bootstrap-time-picker';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import history from '../history';

import * as compensationsActions from '../actions/compensationsActions';

class CompensationsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nightEndTime: moment(),
            nightStartTime: moment(),
            onCallWeekMoney: "1",
            onCallWeekendMoney: "1",
            weekMoneyMult: "1",
            weekendMoneyMult: "1",
            weekTimeMult: "1",
            weekendTimeMult: "1"
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
        const { onCallWeekMoney, onCallWeekendMoney, weekMoneyMult, weekendMoneyMult, weekTimeMult, weekendTimeMult, nightStartTime, nightEndTime } = this.state
        this.props.changeOnCallWeekMoney(onCallWeekMoney);
        this.props.changeOnCallWeekendMoney(onCallWeekendMoney);
        this.props.changeWeekMoneyMult(weekMoneyMult);
        this.props.changeWeekendMoneyMult(weekendMoneyMult);
        this.props.changeWeekTimeMult(weekTimeMult);
        this.props.changeWeekendTimeMult(weekendTimeMult);
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
                                            <Grid.Column width={8} floated="left">
                                                <Form.Field >
                                                    <Form.Input label="Week Money Multiplier" name="weekMoneyMult" type='number' placeholder="Week Money Multiplier" value={this.state.weekMoneyMult}
                                                        onChange={this.handleChange} onBlur={this.handleBlur} />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column width={8} floated="right">
                                                <Form.Field>
                                                    <Form.Input label="Weekend Money Multiplier" name="weekendMoneyMult" type='number' placeholder="Weekend Money Multiplier" value={this.state.weekendMoneyMult}
                                                        onBlur={this.handleBlur} onChange={this.handleChange} />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={8} floated="left">
                                                <Form.Field >
                                                    <Form.Input label="Week Time Multiplier" name="weekTimeMult" type='number' placeholder="Week Time Multiplier" value={this.state.weekTimeMult}
                                                        onBlur={this.handleBlur} onChange={this.handleChange} />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column width={8} floated="right">
                                                <Form.Field>
                                                    <Form.Input label="Weekend Time Multiplier" name="weekendTimeMult" type='number' placeholder="Weekend Time Multiplier" value={this.state.weekendTimeMult}
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
        compensations: state.compensationsReducer.compensations
    }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        // You can now say this.props.createBook
        changeOnCallWeekMoney: newValue => dispatch(compensationsActions.changeOnCallWeekMoney(newValue)),
        changeOnCallWeekendMoney: newValue => dispatch(compensationsActions.changeOnCallWeekendMoney(newValue)),
        changeWeekMoneyMult: newValue => dispatch(compensationsActions.changeWeekMoneyMult(newValue)),
        changeWeekendMoneyMult: newValue => dispatch(compensationsActions.changeWeekendMoneyMult(newValue)),
        changeWeekTimeMult: newValue => dispatch(compensationsActions.changeWeekTimeMult(newValue)),
        changeWeekendTimeMult: newValue => dispatch(compensationsActions.changeWeekendTimeMult(newValue)),
        changeNightStartTime: newValue => dispatch(compensationsActions.changeNightStartTime(newValue)),
        changeNightEndTime: newValue => dispatch(compensationsActions.changeNightEndTime(newValue)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompensationsPage);