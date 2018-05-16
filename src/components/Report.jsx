import React, { Component } from 'react';
import { List, Image, Grid, Table, Header, Button, Search, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

import _ from 'lodash'
import moment from 'moment';
import '../style.css';

import ReactTable from 'react-table';
import "react-table/react-table.css";
import * as reportsActions from '../actions/reportsActions';

import groupArray from 'group-array';

class Reports extends Component {
    constructor(props) {
        super(props);

        this.state = {
            months: []
        }
        this.ReactTableMonths = this.ReactTableMonths.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps report", nextProps);
        this.setState((prevProps, prevState) => {
            return { months: nextProps.months };
        });
    }

    sortByYearMonthReports() {
        let monthsReport = [];

        //Agrupo por año
        let groupedByYearMonth = _.groupBy(this.props.calendarEvents, (result) => moment(result['start'], 'DD/MM/YYYY').startOf('year').format("YYYY"));
        //Vuelvo a agrupar por fecha y año
        _.forEach(groupedByYearMonth, (value, key) => {
            groupedByYearMonth[key] = _.groupBy(groupedByYearMonth[key], item => moment(item['start'], 'DD/MM/YYYY').startOf('month').format("MMMM"));
        });

        //Relleno el modelo por cada uno de los valores agrupados anteriores
        _.forEach(groupedByYearMonth, (month, indexYear) => _.forEach(month, (event, indexMonth) => {
            let itemToAdd = {
                monthName: indexMonth, year: indexYear, overallCompensation: "0",
                workers: event.map((item) => { return { ...item.worker, compensation: '5' } })
            }
            //Calculamos las compensations mensuales
            itemToAdd = { ...itemToAdd, overallCompensation: itemToAdd.workers.reduce((value, sum) => value + Number(sum.compensation), 0) };
            monthsReport.push(itemToAdd);
        }));

        //Ordenamos por año y luego por mes
        return monthsReport = monthsReport.sort((a, b) => a.year - b.year || moment().month(a.monthName).format("M") - moment().month(b.monthName).format("M"));
    }

    componentDidMount() {
        let monthsReport = this.sortByYearMonthReports();
        //Actualizamos los meses de Redux
        this.props.updateMonths(monthsReport);
        //Cambiamos el estado de la aplicación 
        this.setState((prevProps, prevState) => {
            return { months: this.props.months };
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
                                filterable
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
                                    monthName: "Mayo", year: '2018', overallCompensation: "55",
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
        updateMonths: months => dispatch(reportsActions.updateMonths(months))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Reports);