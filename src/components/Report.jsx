import React, { Component } from 'react';
import { List, Image, Grid, Table, Header, Button, Search, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

import _ from 'lodash'
import moment from 'moment';
import '../style.css';

import ReactTable from 'react-table';
import "react-table/react-table.css";
import * as reportsActions from '../actions/reportsActions';

class Reports extends Component {
    constructor(props) {
        super(props);

        this.state = {
            months: []
        }
        props.calendarEvents.map(item => {
            console.log("CalendarEvents", moment(item).format('MMMM'), moment(item).format('YYYY'));
            this.props.addMonth({
                monthName: moment(item).format('MMMM'),
                year: moment(item).format('YYYY'),
                overallCompensation: "55",
                workers: [{ _id: 1, name: 'Jose', compensation: "55" }, { _id: 2, name: 'Ismael', compensation: "35" }]
            })
        });
        this.ReactTableMonths = this.ReactTableMonths.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log("nextProps report", nextProps);
        this.setState((prevProps, prevState)=>{
            return { months: this.props.months}
        });
    }
    ReactTableMonths(props) {
        return (
            <div>
                <ReactTable
                    getTdProps={(state, rowInfo, column) => {
                        return {
                            style: {
                                "whiteSpace": "normal",
                                "display": "flex",
                                "alignItems": "center",
                                "justifyContent": "center"

                            }
                        };
                    }}
                    filterable
                    data={props.data}
                    noDataText="No workers"
                    columns={props.columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    SubComponent={row => {
                        console.log('row', row)
                        return (
                            <ReactTable
                                getTdProps={(state, rowInfo, column) => {
                                    return {
                                        style: {
                                            "whiteSpace": "normal",
                                            "display": "flex",
                                            "alignItems": "center",
                                            "justifyContent": "center"

                                        }
                                    };
                                }}
                                data={row.row._original.workers}
                                columns={[
                                    {
                                        Header: "Name",
                                        id: "name",
                                        accessor: d => d.name,
                                    },
                                    {
                                        Header: "ID",
                                        id: "_id",
                                        accessor: d => d._id,
                                    },
                                    {
                                        Header: "Compensation",
                                        id: "compensation",
                                        accessor: d => d.compensation,
                                    }
                                ]}
                                defaultPageSize={5}
                            />
                        );
                    }}
                />
            </div>
        )
    }

    render() {
        const columnMonths = [
            {
                Header: "Month",
                id: "monthName",
                accessor: d => d.monthName,
            },
            {
                Header: "Year",
                id: "year",
                accessor: d => d.year,
            },
            {
                Header: "Overall compensation",
                id: "overallCompensation",
                accessor: d => d.overallCompensation,
            }
        ]
        return (
            <div>
                <Container>
                    <Grid centered>
                        <Grid.Row>
                            <Grid.Column>
                                <Button floated="left">Auto-schelude</Button>
                                <Button floated="right" onClick={() => this.props.addMonth({
                                    monthName: "Mayo", overallCompensation: "55",
                                    workers: [{ _id: 1, name: 'Jose', compensation: "55" }, { _id: 2, name: 'Ismael', compensation: "35" }]
                                })}>Add employee</Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <this.ReactTableMonths columns={columnMonths} data={this.state.months} />
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
        workers: state.workersReducer.workers,
        months: state.reportsReducer.months,
        calendarEvents: state.calendarReducer.calendarEvents,
    }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        // You can now say this.props.createBook
        addMonth: month => dispatch(reportsActions.addMonth(month)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Reports);