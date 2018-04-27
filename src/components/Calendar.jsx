import React, { Component } from "react";
import { Grid, Button, Header, Icon, Modal, Container } from 'semantic-ui-react'
import { DragDropContext } from 'react-dnd'

import HTML5Backend from 'react-dnd-html5-backend'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import Calendar from "react-big-calendar";
import moment from "moment";

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../style.css';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));
const DragAndDropCalendar = withDragAndDrop(Calendar)

class CalendarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
                {
                    start: new Date(),
                    end: new Date(moment().add(1, "days")),
                    title: "Some title"
                }
            ],
            open: false
        };
        this.moveEvent = this.moveEvent.bind(this);
    }

    onClose = () => this.setState({ open: false });

    moveEvent({ event, start, end }) {
        const { events } = this.state
    
        const idx = events.indexOf(event)
        const updatedEvent = { ...event, start, end }
    
        const nextEvents = [...events]
        nextEvents.splice(idx, 1, updatedEvent)
    
        this.setState({
          events: nextEvents,
        })
    
        alert(`${event.title} was dropped onto ${event.start}`)
      }

    render() {
        return (
            <div>
                <Container>
                    <Grid verticalAlign="middle">
                        <Grid.Row centered >
                            <Grid.Column>
                                <Button floated="left" onClick={() => this.setState({ open: true })}>Auto-schelude</Button>
                                <Button floated="right">Add task</Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column>
                                <DragAndDropCalendar
                                    defaultDate={new Date()}
                                    defaultView="month"
                                    events={this.state.events}
                                    style={{ height: "100vh" }}
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

export default CalendarPage;