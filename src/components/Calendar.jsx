import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import { Grid, Button, Header, Icon, Modal } from 'semantic-ui-react'

import "react-big-calendar/lib/css/react-big-calendar.css";
import '../style.css';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

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
    }

    onClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <Grid verticalAlign="middle">
                    <Grid.Row centered >
                        <Grid.Column width={10}>
                            <Button floated="left" onClick={() => this.setState({open: true})}>Auto-schelude</Button>
                            <Button floated="right">Add task</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column width={10}>
                            <Calendar
                                defaultDate={new Date()}
                                defaultView="month"
                                events={this.state.events}
                                style={{ height: "100vh" }}
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
            </div>
        );
    }
}

export default CalendarPage;