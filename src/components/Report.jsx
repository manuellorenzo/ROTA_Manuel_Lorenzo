import React, { Component } from 'react';
import { List, Image, Grid, Table, Header, Button, Search, Container } from 'semantic-ui-react';
import _ from 'lodash'

import '../style.css';

function GenericTable() {
    return <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Employees</Table.HeaderCell>
                <Table.HeaderCell>Compensation</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.Cell>
                    <Header as='h4' image>
                        <Header.Content>
                            Lena
                        <Header.Subheader>Human Resources</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    <strong>999999999</strong>
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
}

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            results: []
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Grid centered>
                        <Grid.Row>
                            <Grid.Column>
                                <Button floated="left">Auto-schelude</Button>
                                <Button floated="right">Add employee</Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <GenericTable />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}
export default Reports;