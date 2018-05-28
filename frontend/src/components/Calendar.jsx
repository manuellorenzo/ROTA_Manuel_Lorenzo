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
import * as workerActions from '../actions/workersActions';

import Toast from './Toast';
import ConfirmComponent from './Confirm';
import ActionButton from "antd/lib/modal/ActionButton";
import { toast } from "react-toastify";

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
                showAutoScheduleModal: false,
                disabledButtonEditEvent: true
            },
            newEvent: {
                workerId: '',
                startDate: moment(),
                compensations: []
            },
            autoSchedule: {
                start: moment(),
                end: moment().add(1, 'days'),
                overwrite: false
            },
            messages: {
                addEditEvents: {
                    show: false,
                    text: '',
                    type: toast.TYPE.SUCCESS
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
        this.handleAutoScheduleOverwriteCheckboxChange = this.handleAutoScheduleOverwriteCheckboxChange.bind(this);
        this.disabledDateAutoSchedule = this.disabledDateAutoSchedule.bind(this);
    }

    handleOnChangeDropdown(e, { value }) {
        console.log('CHANGIN THE DROPDOWN', value)
        let worker = this.state.onCallOptions.filter(item => item.value === value).map(item => item.text);
        this.setState({ newEvent: { ...this.state.newEvent, workerId: value } });
    }

    componentWillReceiveProps(props) {
        //this.loadCalendarEventsToState()

    }

    componentDidMount() {
        this.loadCalendarEventsToState();
    }

    loadCalendarEventsToState() {
        this.props.loadCalendarEvents().then(() => {
            this.props.loadOnCallWorkers().then(() => {
                this.setState({ calendarEvents: this.props.calendarEvents }, () => {
                    console.log("CALENDAR COMPONENT --- LOAD WORKERS TO STATE ---", this.props.onCall);
                    this.setState({
                        onCallOptions: this.props.onCall.filter((item) => item.inactive === false).map((itemMap) => {
                            return {
                                key: itemMap._id,
                                text: itemMap.name,
                                value: itemMap._id,
                            }
                        })
                    }, () => {
                        console.log('CALENDAR COMPONENT -- LOAD CALENDAR TO STATE -- PROPS', this.state)
                    });
                });
            })
        });
    }

    handleModalClose = (name) => this.setState({
        modals: { ...this.state.modals, [name]: false }, newEvent: {
            workerId: '',
            startDate: moment(),
            compensations: []
        },
    });

    handleOnSelectEventCalendar(evt, e) {
        console.log('handleOnSelectEventCalendar', evt)
        this.setState({
            newEvent: {
                workerId: evt.workerId,
                startDate: evt.start,
                _id: evt._id,
                compensations: evt.compensations
            }
        }, () => {
            this.setState({ modals: { ...this.state.modals, showModalEditEvent: true } });
        })
    }

    moveEvent({ event, start, end }) {
        const updatedEvent = { ...event, start, end }
        console.log('updatedEvents', updatedEvent)
        this.props.changeOnCall(updatedEvent).then(() => {
            this.loadCalendarEventsToState();
        })
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

    handleChangeMessages(value, type) {
        this.setState((prevState, props) => {
            console.log("handleChangesMessages calendar prueba value", value)
            return { messages: { ...prevState.messages, addEditEvents: { ...prevState.messages.addEditEvents, text: value, show: true, type } } }
        }, () => {
            this.setState((prevState, props) => {
                console.log('handleChangesMessages calendar', value, this.state);
                return { messages: { ...prevState.messages, addEditEvents: { ...prevState.messages.addEditEvents, text: value, show: false, type } } }
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
        this.props.removeOnCall(this.state.newEvent._id).then(() => {
            this.loadCalendarEventsToState();
            this.handleChangeMessages("Event deleted successfully", toast.TYPE.SUCCESS);
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
        })

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
            return { newEvent: { ...prevState.newEvent, activities: prevState.newEvent.activities } };
        }, () => {
            console.log("Activity post state checkbox", this.state.newEvent.activities);
        }
        )
    }

    handleAutoScheduleOverwriteCheckboxChange() {
        this.setState((prevState, props) => {
            return { autoSchedule: { ...prevState.autoSchedule, overwrite: !prevState.autoSchedule.overwrite } };
        }, () => {
            console.log("Overwrite post state checkbox", this.state.autoSchedule.overwrite);
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

    checkEmptyEditModal = () => {
        console.log("checkEmptyModal", this.state.newEvent.workReference !== '' && this.state.newEvent.duration !== '');
        return this.state.newEvent.workReference === '' && this.state.newEvent.duration === ''
    }

    handleChangeAutoScheduleDates(name, e) {
        console.log("handleChangeAutoScheduleDates", e)
        if (e !== null) {
            this.setState({ autoSchedule: { ...this.state.autoSchedule, [name]: e._d } })
        }
    }

    disabledDateAutoSchedule(current) {
        // Can not select days before today and today
        return current && current < moment(this.state.autoSchedule.start).endOf('day');
    }

    handleDisabledButtonEditEvent() {
        console.log("CALENDAR COMPONENT -- HANDLE DISABLED BUTTON EDIT EVENT -- ");
        return (this.state.newEvent.workerId === '' && this.state.newEvent.startDate === '');
    }

    render() {
        return (
            <div>
                <Container>
                    <Grid verticalAlign="middle">
                        <Grid.Row centered >
                            <Grid.Column>
                                <Button floated="left" onClick={() => this.setState({ modals: { ...this.state.modals, showModalAddEvent: true } },
                                    console.log("CALENDAR COMPONENT -- SHOW MODAL ADD EVENT -- ", this.state.newEvent.workerId))}>Add event</Button>
                                <Button floated="right" onClick={() => {
                                    this.setState({ modals: { ...this.state.modals, showAutoScheduleModal: true } });
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
                        //FIX MODAL FIXED TO TOP
                        style={{
                            marginTop: '0px !important',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
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
                            <Button floated="right" disabled={this.state.newEvent.workerId === ''} onClick={() => {
                                this.props.getWorkerById(this.state.newEvent.workerId).then((workerData) => {
                                    console.log("CALENDAR CALENDAR CALENDAR ", this.props)
                                    this.props.addOnCallEvent({
                                        start: new Date(this.state.newEvent.startDate),
                                        end: new Date(this.state.newEvent.startDate),
                                        title: workerData.name,
                                        _id: this.state.newEvent._id,
                                        workerId: this.state.newEvent.workerId,
                                        type: this.state.newEvent.compensations.length > 0 ? "Activity" : "On Call",
                                        compensations: this.state.newEvent.compensations
                                    }).then(() => {
                                        this.setState({
                                            newEvent: {
                                                workerId: '',
                                                startDate: moment(),
                                                compensations: []
                                            }
                                        }, () => {
                                            console.log("CALENDAR COMPONENT -- ADD ON CALL EVENT -- ", this.state)
                                            this.loadCalendarEventsToState();
                                            this.handleModalClose("showModalAddEvent");
                                            this.handleChangeMessages("Event added successfully", toast.TYPE.SUCCESS);
                                        });
                                    });
                                })
                            }}>Add event</Button>
                        </Modal.Actions>
                    </Modal>

                    {/*//////////////////////////////EDIT MODAL////////////////////////////////////////////*/}
                    <Modal
                        open={this.state.modals.showModalEditEvent}
                        onClose={() => this.handleModalClose("showModalEditEvent")}
                        size='tiny'
                        closeOnRootNodeClick={false}
                        //FIX MODAL FIXED TO TOP
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
                                    <Form.Dropdown placeholder='Worker' onChange={this.handleOnChangeDropdown} value={this.state.newEvent.workerId} fluid search selection options={this.state.onCallOptions} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Start Date</label>
                                    <DatePicker style={{ width: "100%" }} value={moment(this.state.newEvent.startDate)} format={dateFormat} size="large" onChange={(e) => this.handleChangeNewEventDates(e)} />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox label={{ children: 'Activity' }} onChange={this.handleActivityCheckboxChange} />
                                </Form.Field>
                                {this.state.newEvent.compensations.length > 0 ?
                                    <div>
                                        {/*<Form.Field>
                                            <label>Start Time</label>
                                            <TimePicker style={{ width: "100%" }} value={moment(this.state.newEvent.startTime)}
                                                onChange={this.handleStartTimeActivityChange} format={"HH:mm"} allowEmpty={false} inputReadOnly />
                                        </Form.Field>
                                        <Form.Field>
                                            <Form.Input label="Duration" type='number' placeholder="Duration" name="duration" value={this.state.newEvent.duration} onChange={this.handleActivityInputOnChange} />
                                        </Form.Field>
                                        <Form.Field>
                                            <Form.Input label="Work Reference" name="workReference" type='text' placeholder="Work Reference" value={this.state.newEvent.workReference} onChange={this.handleActivityInputOnChange} />
                                        </Form.Field>*/}
                                        {/*<ReactTable
                                            filterable
                                            data={props.data}
                                            noDataText="No workers"
                                            columns={props.columns}
                                            defaultPageSize={10}
                                            className="-striped -highlight"
                                        />*/}
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
                            <Button floated="right" disabled={this.handleDisabledButtonEditEvent() ? true : false} onClick={() => {
                                this.props.getWorkerById(this.state.newEvent.workerId).then((workerData) => {
                                    this.props.changeOnCall({
                                        start: new Date(this.state.newEvent.startDate),
                                        end: new Date(this.state.newEvent.startDate),
                                        title: workerData.name,
                                        _id: this.state.newEvent._id,
                                        workerId: this.state.newEvent.workerId,
                                        type: this.state.newEvent.compensations.length > 0 ? "Activity" : "On Call",
                                        compensations: this.state.newEvent.compensations
                                    }).then(() => {
                                        this.setState({
                                            newEvent: {
                                                workerId: '',
                                                startDate: moment(),
                                                compensations: []
                                            }
                                        }, () => {
                                            this.loadCalendarEventsToState();
                                            this.handleModalClose("showModalEditEvent");
                                            this.handleChangeMessages("Event edited successfully", toast.TYPE.SUCCESS);
                                        });
                                    });
                                })
                            }}>Edit event</Button>
                        </Modal.Actions>
                    </Modal>
                    {/*//////////////////////////////AUTOSCHEDULE MODAL////////////////////////////////////////////*/}
                    <Modal
                        open={this.state.modals.showAutoScheduleModal}
                        onClose={() => this.handleModalClose("showAutoScheduleModal")}
                        size='tiny'
                        closeOnRootNodeClick={false}
                        //FIX MODAL FIXED TO TOP
                        style={{
                            marginTop: '0px !important',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    >
                        <Header icon='browser' content='AutoSchedule' />
                        <Modal.Content>
                            <Form>
                                <Form.Field >
                                    <label>Start Date</label>
                                    <DatePicker style={{ width: "100%" }} value={moment(this.state.autoSchedule.start)} format={dateFormat} size="large" onChange={(e) => this.handleChangeAutoScheduleDates("start", e)} />
                                </Form.Field>
                                <Form.Field>
                                    <label>End Date</label>
                                    <DatePicker style={{ width: "100%" }} disabledDate={this.disabledDateAutoSchedule} value={moment(this.state.autoSchedule.end)} format={dateFormat} size="large" onChange={(e) => this.handleChangeAutoScheduleDates("end", e)} />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox label={{ children: 'Overwrite' }} onChange={this.handleAutoScheduleOverwriteCheckboxChange} />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => {
                                this.handleModalClose("showAutoScheduleModal")
                                this.setState({
                                    autoSchedule: {
                                        start: moment(),
                                        end: moment(),
                                        overwrite: false
                                    },
                                })
                            }}>Close</Button>
                            <Button floated="right" onClick={() => {
                                console.log("CALENDAR COMPONENT -- ONCLICK AUTOSCHEDULE -- OVERWRITE -- ", this.state.autoSchedule.overwrite)
                                this.props.autoSchedule(moment(new Date(this.state.autoSchedule.start)), moment(new Date(this.state.autoSchedule.end)), this.state.autoSchedule.overwrite).then(() => {
                                    this.setState({
                                        autoSchedule: {
                                            start: moment(),
                                            end: moment(),
                                            overwrite: false
                                        },
                                    }, () => {
                                        this.loadCalendarEventsToState();
                                        this.handleModalClose("showAutoScheduleModal");
                                        this.handleChangeMessages("Auto schedule executed correctly", toast.TYPE.SUCCESS);
                                    });
                                });
                            }}>Add events</Button>
                        </Modal.Actions>
                    </Modal>

                    <Toast message={this.state.messages.addEditEvents.text} show={this.state.messages.addEditEvents.show} type={this.state.messages.addEditEvents.type} />
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
        addOnCallEvent: (event) => dispatch(calendarActions.addOnCallEvent(event)),
        changeOnCall: event => dispatch(calendarActions.changeOnCallEvent(event)),
        removeOnCall: _id => dispatch(calendarActions.removeOnCallEvent(_id)),
        autoSchedule: (start, end, overwrite) => dispatch(calendarActions.autoSchedule(start, end, overwrite)),
        loadCalendarEvents: () => dispatch(calendarActions.loadEvents()),
        //WORKERS
        getWorkerById: _id => dispatch(workerActions.getWorkerById(_id)),
        loadOnCallWorkers: () => dispatch(workerActions.loadOnCallWorkers())
    };
};

CalendarPage = DragDropContext(HTML5Backend)(CalendarPage);
export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);