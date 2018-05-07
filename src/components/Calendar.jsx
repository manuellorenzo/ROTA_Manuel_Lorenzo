import React, { Component } from "react";
import { Grid, Button, Header, Icon, Modal, Container } from 'semantic-ui-react'
import { DragDropContext } from 'react-dnd'
import { connect } from 'react-redux';

import HTML5Backend from 'react-dnd-html5-backend'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import BigCalendar from 'react-big-calendar'
import moment from "moment";

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../style.css';

import * as calendarActions from '../actions/calendarActions';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
const DragAndDropCalendar = withDragAndDrop(BigCalendar)

class CalendarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarEvents: [],
            open: false
        };
        this.moveEvent = this.moveEvent.bind(this);
    }

    componentWillReceiveProps(props) {
        console.log('props will receive prop', props)
        this.setState({ calendarEvents: props.calendarEvents });
    }

    componentDidMount() {
        this.setState({ calendarEvents: this.props.calendarEvents });
    }

    onClose = () => this.setState({ open: false });

    moveEvent({ event, start, end }) {
        const { calendarEvents } = this.state

        const idx = calendarEvents.indexOf(event)
        const updatedEvent = { ...event, start, end }
        console.log('updatedEvents', updatedEvent)
        this.props.changeOnCall(updatedEvent)
        console.log('state events', this.props.calendarEvents);
        /*const nextEvents = [...calendarEvents]
        nextEvents.splice(idx, 1, updatedEvent)

        this.setState({
            calendarEvents: nextEvents,
        })*/

        //alert(`${event._id} was dropped onto ${event.start}`)
    }

    resizeEvent = (resizeType, { event, start, end }) => {
        const updatedEvent = { ...event, start, end }
        this.props.changeOnCall(updatedEvent);

        alert(`${event.title} was resized to ${start}-${end}`)
    }

    render() {
        return (
            <div>
                <Container>
                    <Grid verticalAlign="middle">
                        <Grid.Row centered >
                            <Grid.Column>
                                <Button floated="left" onClick={() => this.setState({ open: true })}>Auto-schelude</Button>
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
                    <Modal open={this.state.open} onClose={this.onClose}>
                        <Modal.Header>Select a Photo</Modal.Header>
                        <Modal.Content image>
                            <Modal.Description>
                                <p>Some contents.</p>
                            </Modal.Description>
                        </Modal.Content>
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