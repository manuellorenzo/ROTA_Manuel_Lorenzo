import React, { Component } from "react";
import { Grid, Button, Header, Icon, Container, Form, Modal, Segment, Message } from 'semantic-ui-react';

import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';

import HTML5Backend from 'react-dnd-html5-backend';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import BigCalendar from 'react-big-calendar';
import moment from "moment";
import { DatePicker } from 'antd';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-datepicker/dist/react-datepicker.css';
import '../style.css';

import * as calendarActions from '../actions/calendarActions';

moment.locale('ko', {
    week: {
        dow: 1,
        doy: 1,
    },
});
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const dateFormat = 'DD/MM/YYYY';

function BasicMessage(props) {
    console.log('Basic message', props);
    return (<Message
        visible={props.visible}
        success={props.success}
        content={props.content}
    />)
}
class CalendarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarEvents: [],
            onCallOptions: [],
            modals: {
                showModalAddEvent: false,
                showModalEditEvent: false
            },
            newEvent: {
                worker: {
                    _id: '',
                    name: ''
                },
                startDate: moment(),
                endDate: moment()
            }
        };
        this.moveEvent = this.moveEvent.bind(this);
        this.handleOnChangeDropdown = this.handleOnChangeDropdown.bind(this);
        this.handleOnSelectEventCalendar = this.handleOnSelectEventCalendar.bind(this);
    }

    handleOnChangeDropdown(e, { value }) {
        console.log('CHANGIN THE DROPDOWN', value)
        let worker = this.state.onCallOptions.filter(item => item.value === value).map(item => item.text);
        this.setState({ newEvent: { ...this.state.newEvent, worker: { _id: value, name: worker.toString() } } });
    }

    componentWillReceiveProps(props) {
        console.log('props will receive prop', props)
        this.setState({ calendarEvents: props.calendarEvents });
        this.setState({
            onCallOptions: this.props.onCall.map((item) => {
                return {
                    key: item._id,
                    text: item.name,
                    value: item._id,
                }
            })
        })
        console.log('onCallOptions', this.state.onCallOptions)

    }

    componentDidMount() {
        this.setState({ calendarEvents: this.props.calendarEvents });
        this.setState({
            onCallOptions: this.props.onCall.map((item) => {
                return {
                    key: item._id,
                    text: item.name,
                    value: item._id,
                }
            })
        })
        console.log('component did mount', this.state)
    }

    handleModalClose = (name) => this.setState({ modals: { ...this.state.modals, [name]: false } });

    handleOnSelectEventCalendar(evt, e) {
        console.log('handleOnSelectEventCalendar', evt)
        this.setState({
            newEvent: {
                worker: evt.worker,
                startDate: evt.start,
                endDate: evt.end,
                _id: evt._id
            }
        })
        this.setState({ modals: { ...this.state.modals, showModalEditEvent: true } });
    }

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
                                <Button floated="left" onClick={() => this.setState({ modals: { ...this.state.modals, showModalAddEvent: true } })}>Auto-schelude</Button>
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
                                    popup
                                    onSelectEvent={this.handleOnSelectEventCalendar}
                                    eventPropGetter={
                                        (event, start, end, isSelected) => {
                                            let newStyle = {
                                                backgroundColor: "lightgrey",
                                                color: 'black',
                                                borderRadius: "0px",
                                                border: "none"
                                            };

                                            if (event.type === 'OnCall') {
                                                newStyle.backgroundColor = "lightgreen"
                                            }

                                            return {
                                                className: "",
                                                style: newStyle
                                            };
                                        }
                                    }
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    {/*//////////////////////////////ADD MODAL////////////////////////////////////////////*/}
                    <Modal
                        open={this.state.modals.showModalAddEvent}
                        onClose={() => this.handleModalClose("showModalAddEvent")}
                        size='tiny'
                        closeOnRootNodeClick={false}
                    >
                        <Header icon='browser' content='New On Call Event' />
                        <Modal.Content>
                            <Form>
                                <Form.Field >
                                    <Form.Dropdown placeholder='Worker' onChange={this.handleOnChangeDropdown} fluid search selection options={this.state.onCallOptions} />
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
                            <Button onClick={() => this.handleModalClose("showModalAddEvent")}>Close</Button>
                            <Button floated="right" disabled={this.state.newEvent.worker._id === ''} onClick={() => {
                                this.props.addOnCall({
                                    start: new Date(this.state.newEvent.startDate),
                                    end: new Date(this.state.newEvent.endDate),
                                    title: this.state.newEvent.worker.name,
                                    _id: Math.random(),
                                    type: 'OnCall',
                                    worker: this.state.newEvent.worker
                                });
                                console.log("ADD EVENT WORKER", this.state.newEvent.worker);
                                this.setState({
                                    newEvent: {
                                        worker: {
                                            _id: '',
                                            name: ''
                                        },
                                        startDate: moment(),
                                        endDate: moment()
                                    }
                                });
                                this.handleModalClose("showModalAddEvent");
                            }}>Add task</Button>
                        </Modal.Actions>
                    </Modal>

                    {/*//////////////////////////////EDIT MODAL////////////////////////////////////////////*/}
                    <Modal
                        open={this.state.modals.showModalEditEvent}
                        onClose={() => this.handleModalClose("shoModalEditEvent")}
                        size='tiny'
                        closeOnRootNodeClick={false}
                    >
                        <Header icon='browser' content='Edit On Call Event' />
                        <Modal.Content>
                            <Form>
                                <Form.Field >
                                    <Form.Dropdown placeholder='Worker' onChange={this.handleOnChangeDropdown} value={this.state.newEvent.worker._id} fluid search selection options={this.state.onCallOptions} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Start Date</label>
                                    <DatePicker style={{ width: "100%" }} value={moment(this.state.newEvent.startDate)} format={dateFormat} size="large" onChange={(e) => this.handleChangeNewEventDates(e, "startDate")} />
                                </Form.Field>
                                <Form.Field>
                                    <label>End Date</label>
                                    <DatePicker style={{ width: "100%" }} value={moment(this.state.newEvent.endDate)} format={dateFormat} size="large" onChange={(e) => this.handleChangeNewEventDates(e, "endDate")} />
                                </Form.Field>
                                <BasicMessage success={true} visible={true} content="Se ha añadido" />
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => this.handleModalClose("showModalEditEvent")}>Close</Button>
                            <Button floated="right" disabled={this.state.newEvent.worker._id === ''} onClick={() => {
                                this.props.changeOnCall({
                                    start: new Date(this.state.newEvent.startDate),
                                    end: new Date(this.state.newEvent.endDate),
                                    title: this.state.newEvent.worker.name,
                                    _id: this.state.newEvent._id,
                                    worker: this.state.newEvent.worker,
                                    type: 'OnCall'
                                });
                                this.setState({
                                    newEvent: {
                                        worker: {
                                            _id: '',
                                            name: ''
                                        },
                                        startDate: moment(),
                                        endDate: moment()
                                    }
                                });
                                this.handleModalClose("showModalEditEvent");
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
    };
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        // You can now say this.props.createBook
        addOnCall: event => dispatch(calendarActions.addOnCall(event)),
        changeOnCall: event => dispatch(calendarActions.changeOnCall(event))
    };
};

CalendarPage = DragDropContext(HTML5Backend)(CalendarPage);
export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);