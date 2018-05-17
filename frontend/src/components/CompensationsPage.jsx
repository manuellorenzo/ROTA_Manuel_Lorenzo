import React, { Component } from 'react';
import { Input, Button, Grid, Form, Image, Menu, Container, Header, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux';

//import TimePicker from 'react-bootstrap-time-picker';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import history from '../history';

import ReactTable from 'react-table';
import "react-table/react-table.css";

import * as compensationsActions from '../actions/compensationsActions';

class CompensationsPage extends Component {
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
            nightEndTime: "12:00",
            nightStartTime: "12:00",
        };
        this.handleNightStartTimeChange = this.handleNightStartTimeChange.bind(this);
        this.handleNightEndTimeChange = this.handleNightEndTimeChange.bind(this);

    }

    componentDidMount() {
        //ACTUALIZAR REDUX CON LOS DATOS DE LA API
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
        const { onCallWeekMoney, onCallWeekendMoney,
            bfNtWeekMoneyMult, afNtWeekMoneyMult, bfNtWeekTimeMult, afNtWeekTimeMult,
            bfNtWeekendMoneyMult, afNtWeekendMoneyMult, bfNtWeekendTimeMult, afNtWeekendTimeMult,
            nightEndTime, nightStartTime } = this.state
        //ON CALL MONEY
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
        this.props.changeNightStartTime(nightStartTime);
    }

    handleBlur = (e) => {
        if (e.target.value === "") {
            e.target.value = 1;
        }
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const compensationsTableColumns = [
            {
                Header: "Before Night Time Money",
                id: "bfNT",
                accessor: d => d.bfNtWeekMoneyMult
            },
            {
                Header: "After Night Time Money",
                id: "lastName",
                accessor: d => d.afNtWeekMoneyMult
            }
        ]
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
                                            <ReactTable
                                                data={[]}
                                                columns={this.compensationsTableColumns}
                                                defaultPageSize={10}
                                                className="-striped -highlight"
                                            />
                                        </Grid.Row>
                                        {/*<Grid.Row>
                                            <Grid.Column>
                                                <Header as="h3">Before Night Time</Header>
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
                                            <Grid.Column>
                                                <Header as="h3">Before Night Time</Header>
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
                                        </Grid.Row>*/}
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
        compensations: state.compensationsReducer.compensations
    }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        //ON CALL METHODS
        changeOnCallWeekMoney: newValue => dispatch(compensationsActions.changeOnCallWeekMoney(newValue)),
        changeOnCallWeekendMoney: newValue => dispatch(compensationsActions.changeOnCallWeekendMoney(newValue)),

        //WEEK METHODS
        changeBeforeNTWeekMoneyMult: newValue => dispatch(compensationsActions.changeBeforeNTWeekMoneyMult(newValue)),
        changeAfterNTWeekMoneyMult: newValue => dispatch(compensationsActions.changeAfterNTWeekMoneyMult(newValue)),
        changeBeforeNTWeekTimeMult: newValue => dispatch(compensationsActions.changeBeforeNTWeekTimeMult(newValue)),
        changeAfterNTWeekTimeMult: newValue => dispatch(compensationsActions.changeAfterNTWeekTimeMult(newValue)),

        //WEEKEND METHODS
        changeBeforeNTWeekendMoneyMult: newValue => dispatch(compensationsActions.changeBeforeNTWeekendMoneyMult(newValue)),
        changeAfterNTWeekendMoneyMult: newValue => dispatch(compensationsActions.changeAfterNTWeekendMoneyMult(newValue)),
        changeBeforeNTWeekendTimeMult: newValue => dispatch(compensationsActions.changeBeforeNTWeekendTimeMult(newValue)),
        changeAfterNTWeekendTimeMult: newValue => dispatch(compensationsActions.changeAfterNTWeekendTimeMult(newValue)),

        //TIME METHODS
        changeNightStartTime: newValue => dispatch(compensationsActions.changeNightStartTime(newValue)),
        changeNightEndTime: newValue => dispatch(compensationsActions.changeNightEndTime(newValue)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompensationsPage);