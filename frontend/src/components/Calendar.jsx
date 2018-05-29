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
import 'antd/dist/antd.css';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
//import 'react-datepicker/dist/react-datepicker.css';ç
import '../style.css';

import * as calendarActions from '../actions/calendarActions';
import * as workerActions from '../actions/workersActions';
import * as conmpensationsActions from '../actions/compensationAction';

import Toast from './Toast';
import ConfirmComponent from './Confirm';
import ActionButton from "antd/lib/modal/ActionButton";
import { toast } from "react-toastify";

import ReactTable from 'react-table';
import "react-table/react-table.css";

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
        this.handleStartTimeActivityChange = this.handleStartTimeActivityChange.bind(this);
        this.handleActivityInputOnChange = this.handleActivityInputOnChange.bind(this);
        this.handleAutoScheduleOverwriteCheckboxChange = this.handleAutoScheduleOverwriteCheckboxChange.bind(this);
        this.disabledDateAutoSchedule = this.disabledDateAutoSchedule.bind(this);
        this.ActivitiesTable = this.ActivitiesTable.bind(this);
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
        let compensations = [];
        Promise.all(evt.compensations.map(item => {
            return this.props.getCompensationById(item).then(result => compensations = [...compensations, result.compensation]);
        })).then(() => this.setState({
            newEvent: {
                workerId: evt.workerId,
                startDate: evt.start,
                _id: evt._id,
                compensations
            }
        }, () => {
            console.log("CALENDAR COMPONENT -- HANDLE ON SELECT EVENT CALENDAR -- COMPENSATIONS -- ", this.state.newEvent)
            this.setState({ modals: { ...this.state.modals, showModalEditEvent: true } });
        }))
    }

    moveEvent({ event, start, end }) {
        const updatedEvent = { ...event, start, end }
        console.log('updatedEvents', updatedEvent)
        this.props.changeOnCallEvent(updatedEvent).then(() => {
            this.loadCalendarEventsToState();
        })
        console.log('state events', this.props.calendarEvents);
    }

    /*resizeEvent = (resizeType, { event, start, end }) => {
        const updatedEvent = { ...event, start, end }
        this.props.AchangeOnCallEvent(updatedEvent);
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
        this.props.removeOnCallEvent(this.state.newEvent._id).then(() => {
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

    handleActivitiesTableChange(key, value, _id) {
        console.log("CALENDAR COMPONENT -- HANDLE ACTIVITIES TABLE CHANGE -- ", value, _id)
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                compensations: this.state.newEvent.compensations.map(item => item._id === _id ? { ...item, [key]: value, edited: true } : item)
            }
        })
    }
    
    ActivitiesTable(props) {
        let columns = [
            {
                Header: "Start",
                id: "startTime",
                Cell: row => {
                    return (<TimePicker style={{ width: "100%" }} size="large" value={moment(new Date(row.original.startTime))} onChange={(e) => this.handleActivitiesTableChange("startTime", e, row.original._id)} />)
                }
            },
            {
                Header: "Duration",
                id: "duration",
                Cell: row => {
                    return (<Form.Input type="number" step={.01} value={row.original.duration} onChange={(e) => this.handleActivitiesTableChange("duration", e.target.value, row.original._id)} />)
                }
            },
            {
                Header: "Work Reference",
                id: "workReference",
                Cell: row => {
                    return (<Form.Input value={row.original.workReference} onChange={(e) => this.handleActivitiesTableChange("workReference", e.target.value, row.original._id)} />)
                }

            }
        ]
        return <div>
            <ReactTable
                data={props.data}
                noDataText="No activities"
                columns={columns}
                defaultPageSize={3}
                className="-striped -highlight"
            />
        </div>
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
                                    console.log("CALENDAR COMPONENT -- ADD EVENT BUTTON PRESSED -- ", this.state.newEvent)
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
                        size='small'
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
                                    <Form.Dropdown placeholder='Worker' min={0} onChange={this.handleOnChangeDropdown} value={this.state.newEvent.workerId} fluid search selection options={this.state.onCallOptions} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Start Date</label>
                                    <DatePicker style={{ width: "100%" }} value={moment(this.state.newEvent.startDate)} format={dateFormat} size="large" onChange={(e) => this.handleChangeNewEventDates(e)} />
                                </Form.Field>
                                <this.ActivitiesTable data={this.state.newEvent.compensations} />
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
                                    Promise.all(this.state.newEvent.compensations.filter(item => item.edited === true).map(item => this.props.editCompensation(item))).then(() => {
                                        this.props.changeOnCallEvent({
                                            start: new Date(this.state.newEvent.startDate),
                                            end: new Date(this.state.newEvent.startDate),
                                            title: workerData.name,
                                            _id: this.state.newEvent._id,
                                            workerId: this.state.newEvent.workerId,
                                            type: this.state.newEvent.compensations.length > 0 ? "Activity" : "On Call",
                                            compensations: this.state.newEvent.compensations.map(item => item._id)
                                        }).then((result) => {
                                            console.log("CALENDAR COMPONENT -- EDIT BUTTON RESULT -- ", result);
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
        changeOnCallEvent: event => dispatch(calendarActions.changeOnCallEvent(event)),
        removeOnCallEvent: _id => dispatch(calendarActions.removeOnCallEvent(_id)),
        autoSchedule: (start, end, overwrite) => dispatch(calendarActions.autoSchedule(start, end, overwrite)),
        loadCalendarEvents: () => dispatch(calendarActions.loadEvents()),
        //WORKERS
        getWorkerById: _id => dispatch(workerActions.getWorkerById(_id)),
        loadOnCallWorkers: () => dispatch(workerActions.loadOnCallWorkers()),
        //COMPENSATIONS
        getCompensationById: _id => dispatch(conmpensationsActions.getCompensationById(_id)),
        editCompensation: newComp => dispatch(conmpensationsActions.editCompensation(newComp))
    };
};

CalendarPage = DragDropContext(HTML5Backend)(CalendarPage);
export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);