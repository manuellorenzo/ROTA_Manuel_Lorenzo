import React, { Component } from "react";
import { Grid, Button, Header, Icon, Container, Form, Modal } from 'semantic-ui-react'

//import { Modal } from 'react-bootstrap'

import { DragDropContext } from 'react-dnd'
import { connect } from 'react-redux';

import HTML5Backend from 'react-dnd-html5-backend'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import BigCalendar from 'react-big-calendar'
import moment from "moment";
import { DatePicker } from 'antd';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-datepicker/dist/react-datepicker.css';
import '../style.css';

import * as calendarActions from '../actions/calendarActions';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
const DragAndDropCalendar = withDragAndDrop(BigCalendar)
const dateFormat = 'DD/MM/YYYY';

class CalendarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarEvents: [],
            onCallOptions: [],
            show: false,
            newEvent: {
                name: "",
                startDate: moment(),
                endDate: moment()
            }
        };
        this.moveEvent = this.moveEvent.bind(this);
    }

    componentWillReceiveProps(props) {
        console.log('props will receive prop', props)
        this.setState({ calendarEvents: props.calendarEvents });
        this.setState({
            onCallOptions: this.props.onCall.map((item) => {
                return {
                    text: item.name,
                    value: item._id,
                }
            })
        })

    }

    componentDidMount() {
        this.setState({ calendarEvents: this.props.calendarEvents });
        this.setState({
            onCallOptions: this.props.onCall.map((item) => {
                return {
                    text: item.name,
                    value: item._id,
                }
            })
        })
        console.log('component did mount', this.state)
    }

    handleClose = () => this.setState({ show: false });

    moveEvent({ event, start, end }) {
        console.log("moveEvent")
        const { calendarEvents } = this.state

        const idx = calendarEvents.indexOf(event)
        const updatedEvent = { ...event, start, end }
        console.log('updatedEvents', updatedEvent)
        this.props.changeOnCall(updatedEvent)
        console.log('state events', this.props.calendarEvents);
    }

    resizeEvent = (resizeType, { event, start, end }) => {
        const updatedEvent = { ...event, start, end }
        this.props.changeOnCall(updatedEvent);
    }
    componentWillUpdate(props, state) {
        console.log("will update", state)
    }

    compo
    handleChangeNewEvent = (e, { name, value }) => {
        this.setState({ newEvent: { ...this.state.newEvent, [name]: value } })
    }

    handleChangeNewEventDates(e, name) {
        console.log("handleChangeDates", e)
        name === "startDate"
            ? this.setState({ newEvent: { ...this.state.newEvent, startDate: e._d } })
            : this.setState({ newEvent: { ...this.state.newEvent, endDate: e._d } })
    }

    render() {
        return (
            <div>
                <Container>
                    <Grid verticalAlign="middle">
                        <Grid.Row centered >
                            <Grid.Column>
                                <Button floated="left" onClick={() => (this.setState({ show: true }), console.log("onshow"))}>Auto-schelude</Button>
                                <Button floated="right" onClick={() => {
                                    this.props.addOnCall({
                                        start: new Date(),
                                        end: new Date(moment().add(1, "days")),
                                        title: "Some title",
                                        _id: Math.random()
                                    })
                                }}>Add task</Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column>
                                <DragAndDropCalendar
                                    selectable
                                    resizable
                                    defaultDate={new Date()}
                                    defaultView="month"
                                    events={this.state.calendarEvents}
                                    onEventResize={this.resizeEvent}
                                    style={{ height: "70vh" }}
                                    onEventDrop={this.moveEvent}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Modal
                        open={this.state.show}
                        onClose={this.handleClose}
                        size='tiny'
                        closeOnRootNodeClick={false}
                    >
                        <Header icon='browser' content='New On Call Event' />
                        <Modal.Content>
                            <Form>
                                <Form.Field >
                                    <Form.Dropdown label="Name" name="name" placeholder="Name" options={this.props.onCall} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Start Date</label>
                                    <DatePicker style={{ width: "100%" }} value={moment(this.state.newEvent.startDate)} format={dateFormat} size="large" onChange={(e) => this.handleChangeNewEventDates(e, "startDate")} />
                                </Form.Field>
                                <Form.Field>
                                    <label>End Date</label>
                                    <DatePicker style={{ width: "100%" }} value={moment(this.state.newEvent.endDate)} format={dateFormat} size="large" onChange={(e) => this.handleChangeNewEventDates(e, "endDate")} />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.handleClose}>Close</Button>
                            <Button floated="right" onClick={() => {
                                this.props.addOnCall({
                                    start: new Date(this.state.newEvent.startDate),
                                    end: new Date(this.state.newEvent.endDate),
                                    title: this.state.newEvent.name,
                                    _id: Math.random()
                                })
                                this.setState({
                                    newEvent: {
                                        name: "",
                                        startDate: moment(),
                                        endDate: moment()
                                    }
                                })
                                this.handleClose()
                            }}>Add task</Button>
                        </Modal.Actions>
                    </Modal>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('maptostate', state);
    return {
        // You can now say this.props.workers
        calendarEvents: state.calendarReducer.calendarEvents,
        onCall: state.workersReducer.onCall
    }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        // You can now say this.props.createBook
        addOnCall: event => dispatch(calendarActions.addOnCall(event)),
        changeOnCall: event => dispatch(calendarActions.changeOnCall(event))
    }
};

CalendarPage = DragDropContext(HTML5Backend)(CalendarPage);
export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);