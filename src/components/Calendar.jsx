import React, { Component } from "react";
import { Grid, Button, Header, Icon, Container, Form, Modal, Segment, Message, Checkbox } from 'semantic-ui-react';

import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';

import HTML5Backend from 'react-dnd-html5-backend';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import BigCalendar from 'react-big-calendar';
import moment from "moment";
import { DatePicker } from 'antd';
import { TimePicker } from 'antd';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
//import 'react-datepicker/dist/react-datepicker.css';ç
import 'antd/dist/antd.css';
import '../style.css';

import * as calendarActions from '../actions/calendarActions';

import Toast from './Toast';
import ConfirmComponent from './Confirm';
import ActionButton from "antd/lib/modal/ActionButton";

moment.locale('ko', {
    week: {
        dow: 1,
        doy: 1,
    },
});
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const dateFormat = 'DD/MM/YYYY';

class CalendarPage extends Component {
    constructor(props) {
        super(props);

        this.bindFunctions();

        this.state = {
            calendarEvents: [],
            onCallOptions: [],
            modals: {
                showModalAddEvent: false,
                showModalEditEvent: false,
                disabledButtonEditEvent: true
            },
            newEvent: {
                worker: {
                    _id: '',
                    name: ''
                },
                startDate: moment(),
                activity: false,
                startTime: moment().format('HH:mm'),
                duration: 0,
                workReference: ''
            },
            messages: {
                addEditEvents: {
                    show: false,
                    text: '',
                },
                confirmDelete: {
                    open: false
                },
            },
        };
        console.log("Constructor calendar", moment().format('HH:mm'));
    }

    bindFunctions() {
        this.moveEvent = this.moveEvent.bind(this);
        this.handleOnChangeDropdown = this.handleOnChangeDropdown.bind(this);
        this.handleOnSelectEventCalendar = this.handleOnSelectEventCalendar.bind(this);
        this.handleChangeMessages = this.handleChangeMessages.bind(this);
        this.handleOnConfirmCalendar = this.handleOnConfirmCalendar.bind(this);
        this.handleOnCloseCalendar = this.handleOnCloseCalendar.bind(this);
        this.handleActivityCheckboxChange = this.handleActivityCheckboxChange.bind(this);
        this.handleStartTimeActivityChange = this.handleStartTimeActivityChange.bind(this);
        this.handleActivityInputOnChange = this.handleActivityInputOnChange.bind(this);
    }

    handleOnChangeDropdown(e, { value }) {
        console.log('CHANGIN THE DROPDOWN', value)
        let worker = this.state.onCallOptions.filter(item => item.value === value).map(item => item.text);
        this.setState({ newEvent: { ...this.state.newEvent, worker: { _id: value, name: worker.toString() } } });
    }

    componentWillReceiveProps(props) {
        console.log('props will receive prop', props)
        this.setState({ calendarEvents: props.calendarEvents }, () => {
            this.setState({
                onCallOptions: this.props.onCall.map((item) => {
                    return {
                        key: item._id,
                        text: item.name,
                        value: item._id,
                    }
                })
            })
        });
        console.log('onCallOptions', this.state.onCallOptions)

    }

    componentDidMount() {
        this.setState({ calendarEvents: this.props.calendarEvents }, () => {
            this.setState({
                onCallOptions: this.props.onCall.map((item) => {
                    return {
                        key: item._id,
                        text: item.name,
                        value: item._id,
                    }
                })
            });
        });
        console.log('component did mount', this.state)
    }

    handleModalClose = (name) => this.setState({
        modals: { ...this.state.modals, [name]: false }, newEvent: {
            worker: {
                _id: '',
                name: ''
            },
            startDate: moment(),
        },
    });

    handleOnSelectEventCalendar(evt, e) {
        console.log('handleOnSelectEventCalendar', evt)
        this.setState({
            newEvent: {
                worker: evt.worker,
                startDate: evt.start,
                _id: evt._id
            }
        }, () => {
            this.setState({ modals: { ...this.state.modals, showModalEditEvent: true } });

        })
    }

    moveEvent({ event, start, end }) {
        const updatedEvent = { ...event, start, end }
        console.log('updatedEvents', updatedEvent)
        this.props.changeOnCall(updatedEvent)
        console.log('state events', this.props.calendarEvents);
    }

    /*resizeEvent = (resizeType, { event, start, end }) => {
        const updatedEvent = { ...event, start, end }
        this.props.AchangeOnCall(updatedEvent);
    }*/

    componentWillUpdate(props, state) {
        console.log("will update", state)
    }

    handleChangeNewEvent = (e, { name, value }) => {
        this.setState({ newEvent: { ...this.state.newEvent, [name]: value } })
    }

    handleChangeMessages(value) {
        this.setState((prevState, props) => {
            console.log("handleChangesMessages calendar prueba value", value)
            return { messages: { ...prevState.messages, addEditEvents: { ...prevState.messages.addEditEvents, text: value, show: true } } }

        }, () => {
            this.setState((prevState, props) => {
                console.log('handleChangesMessages calendar', value, this.state);
                return { messages: { ...prevState.messages, addEditEvents: { ...prevState.messages.addEditEvents, text: value, show: false } } }
            })
        });
    }

    handleChangeNewEventDates(e) {
        console.log("handleChangeDates", e)
        if (e !== null) {
            this.setState({ newEvent: { ...this.state.newEvent, startDate: e._d } })
        }
    }

    handleOnDismiss(name) {
        this.setState({ messages: { ...this.state.messages, [name]: false } });
    }

    handleOnConfirmCalendar = () => {
        this.props.removeOnCall(this.state.newEvent._id);
        this.handleChangeMessages("Event deleted successfully");
        this.handleModalClose("showModalEditEvent");
        this.setState((prevState, props) => {
            return {
                messages: {
                    ...prevState.messages, confirmDelete: {
                        open: false
                    }
                }
            }
        });
    }

    handleOnCloseCalendar = () => {
        this.setState({
            messages: {
                ...this.state.messages, confirmDelete: {
                    open: false
                }
            }
        });
    }

    handleActivityCheckboxChange() {
        this.setState((prevState, props) => {
            return { newEvent: { ...prevState.newEvent, activity: !prevState.newEvent.activity } };
        }, () => {
            console.log("Activity post state checkbox", this.state.newEvent.activity);
        }
        )
    }

    handleStartTimeActivityChange(startTime) {
        this.setState((prevState, props) => {
            console.log("handleStartTimeChange", startTime);
            return { newEvent: { ...prevState.newEvent, startTime: startTime } };
        });
    }

    handleActivityInputOnChange(e, { name, value }) {
        this.setState((prevState, props) => { return { newEvent: { ...prevState.newEvent, [name]: value } } });
    }

    checkEmptyEditModal = () =>{
        console.log("checkEmtyModal", this.state.newEvent.workReference !== '' && this.state.newEvent.duration !== '');
        return this.state.newEvent.workReference === '' && this.state.newEvent.duration === ''
    }
    render() {
        return (
            <div>
                <Container>
                    <Grid verticalAlign="middle">
                        <Grid.Row centered >
                            <Grid.Column>
                                <Button floated="left" onClick={() => this.setState({ modals: { ...this.state.modals, showModalAddEvent: true } })}>Add event</Button>
                                <Button floated="right" onClick={() => {
                                    this.props.addOnCall({
                                        start: new Date(),
                                        end: new Date(moment().add(1, "days")),
                                        title: "Some title",
                                        _id: Math.random()
                                    })
                                }}>Auto-schelude</Button>
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
                                    /*onEventResize={this.resizeEvent}*/
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
                                                newStyle.backgroundColor = "lightgreen";
                                            } else {
                                                newStyle.backgroundColor = "lightblue";
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
                                    <label>Developer</label>
                                    <Form.Dropdown placeholder='Worker' onChange={this.handleOnChangeDropdown} fluid search selection options={this.state.onCallOptions} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Event Date</label>
                                    <DatePicker style={{ width: "100%" }} value={moment(this.state.newEvent.startDate)} format={dateFormat} size="large" onChange={(e) => this.handleChangeNewEventDates(e)} />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => this.handleModalClose("showModalAddEvent")}>Close</Button>
                            <Button floated="right" disabled={this.state.newEvent.worker._id === ''} onClick={() => {
                                this.props.addOnCall({
                                    start: new Date(this.state.newEvent.startDate),
                                    end: new Date(this.state.newEvent.startDate),
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
                                        activity: false,
                                        startTime: moment(),
                                        duration: '0',
                                        workReference: ''
                                    }
                                }, () => {
                                    this.handleModalClose("showModalAddEvent");
                                    this.handleChangeMessages("Event added successfully");
                                });
                            }}>Add event</Button>
                        </Modal.Actions>
                    </Modal>

                    {/*//////////////////////////////EDIT MODAL////////////////////////////////////////////*/}
                    <Modal
                        open={this.state.modals.showModalEditEvent}
                        onClose={() => this.handleModalClose("shoModalEditEvent")}
                        size='tiny'
                        closeOnRootNodeClick={false}
                        style={{
                            marginTop: '0px !important',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    >
                        <Header icon='browser' content='Edit On Call Event' />
                        <Modal.Content scrolling>
                            <Form>
                                <Form.Field>
                                    <label>Developer</label>
                                    <Form.Dropdown placeholder='Worker' onChange={this.handleOnChangeDropdown} value={this.state.newEvent.worker._id} fluid search selection options={this.state.onCallOptions} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Start Date</label>
                                    <DatePicker style={{ width: "100%" }} value={moment(this.state.newEvent.startDate)} format={dateFormat} size="large" onChange={(e) => this.handleChangeNewEventDates(e)} />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox label={{ children: 'Activity' }} onChange={this.handleActivityCheckboxChange} />
                                </Form.Field>
                                {this.state.newEvent.activity === true ?
                                    <div>
                                        <Form.Field>
                                            <label>Start Time</label>
                                            <TimePicker style={{ width: "100%" }} value={moment(this.state.newEvent.startTime)}
                                                onChange={this.handleStartTimeActivityChange} format={"HH:mm"} allowEmpty={false} inputReadOnly />
                                        </Form.Field>
                                        <Form.Field>
                                            <Form.Input label="Duration" type='number' placeholder="Duration" name="duration" value={this.state.newEvent.duration} onChange={this.handleActivityInputOnChange} />
                                        </Form.Field>
                                        <Form.Field>
                                            <Form.Input label="Work Reference" name="workReference" type='text' placeholder="Work Reference"  value={this.state.newEvent.workReference} onChange={this.handleActivityInputOnChange}/>
                                        </Form.Field>
                                    </div>
                                    : null}
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => this.handleModalClose("showModalEditEvent")}>Close</Button>
                            <Button onClick={() => {
                                this.setState((prevState, props) => {
                                    return {
                                        messages: {
                                            ...this.state.messages, confirmDelete: {
                                                open: true
                                            }
                                        }
                                    }
                                });
                            }}>Remove</Button>
                            <Button floated="right" disabled={this.state.modals.disabledButtonEditEvent} onClick={() => {
                                this.props.changeOnCall({
                                    start: new Date(this.state.newEvent.startDate),
                                    end: new Date(this.state.newEvent.startDate),
                                    title: this.state.newEvent.worker.name,
                                    _id: this.state.newEvent._id,
                                    worker: this.state.newEvent.worker,
                                    type: this.state.newEvent.activity === true ? "Activity" : "On Call",
                                    startTime: this.state.newEvent.startTime,
                                    duration: this.state.newEvent.duration,
                                    workReference: this.state.newEvent.workReference
                                });
                                this.setState({
                                    newEvent: {
                                        worker: {
                                            _id: '',
                                            name: ''
                                        },
                                        startDate: moment(),
                                        activity: false,
                                        startTime: moment(),
                                        duration: '0',
                                        workReference: ''
                                    }
                                }, () => {
                                    this.handleModalClose("showModalEditEvent");
                                    this.handleChangeMessages("Event edited successfully");
                                });
                            }}>Edit event</Button>
                        </Modal.Actions>
                    </Modal>
                    <Toast message={this.state.messages.addEditEvents.text} show={this.state.messages.addEditEvents.show} />
                    <ConfirmComponent show={this.state.messages.confirmDelete.open} onConfirm={this.handleOnConfirmCalendar} onClose={this.handleOnCloseCalendar} />
                </Container>
            </div >
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
        changeOnCall: event => dispatch(calendarActions.changeOnCall(event)),
        removeOnCall: _id => dispatch(calendarActions.removeOnCall(_id))
    };
};

CalendarPage = DragDropContext(HTML5Backend)(CalendarPage);
export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);