import React, { Component } from "react";
import { Table, Icon, Divider } from 'antd';
import { Grid, Button, Container } from 'semantic-ui-react';
import moment from 'moment';
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Compensation',
  dataIndex: 'compensation',
  key: 'compensation',
}];

class MonthlyReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mes: moment().format("MMMM YYYY")
        }
    }

    render() {
        return(
            <div>
                <Container>
                    <Grid verticalAlign="middle">
                        <Grid.Row centered >
                            <Grid.Column>
                                <Button floated="left" onClick={() => {
                                    this.setState({mes: moment(new Date(this.state.mes)).subtract(1,'month').format("MMMM YYYY")});
                                }}>Anterior</Button>
                                <Button floated="right" onClick={() => {
                                    this.setState({mes: moment(new Date(this.state.mes)).add(1,'month').format("MMMM YYYY")});
                                }}>Siguiente</Button>
                                <div style={{whiteSpace:"normal", display: "flex", alignItems: "center", justifyContent: "center"}} >{this.state.mes}</div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>    
                    <Table columns={columns} />
                </Container>
            </div>
        )
    }
}

export default MonthlyReport;

