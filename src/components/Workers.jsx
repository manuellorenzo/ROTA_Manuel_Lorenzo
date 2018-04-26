import React, { Component } from 'react';
import { List, Image, Grid, Table, Header, Button, Search, Container } from 'semantic-ui-react';
import _ from 'lodash'


function GenericTable() {
    return <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>On Call Employees</Table.HeaderCell>
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
                    <Button floated="right">Remove from pool</Button>
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>
                    <Header as='h4' image>
                        <Header.Content>
                            Matthew
<Header.Subheader>Fabric Design</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Button floated="right">Remove from pool</Button>
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>
                    <Header as='h4' image>
                        <Header.Content>
                            Matthew
                            <Header.Subheader>Fabric Design</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Button floated="right">Remove from pool</Button>
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>
                    <Header as='h4' image>
                        <Header.Content>
                            Mark
<Header.Subheader>Executive</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Button floated="right">Remove from pool</Button>
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
}

function GenericList() {
    return <List divided verticalAlign='middle'>
        <List.Item>
            <List.Content floated='right'>
                <Button>Add to On Call pool</Button>
                <Button>Remove</Button>
            </List.Content>
            <List.Content>
                Lena
      </List.Content>
        </List.Item>
        <List.Item>
            <List.Content floated='right'>
                <Button>Add to On Call pool</Button>
                <Button>Remove</Button>
            </List.Content>
            <List.Content>
                Lindsay
      </List.Content>
        </List.Item>
        <List.Item>
            <List.Content floated='right'>
                <Button>Add to On Call pool</Button>
                <Button>Remove</Button>
            </List.Content>
            <List.Content>
                Mark
      </List.Content>
        </List.Item>
        <List.Item>
            <List.Content floated='right'>
                <Button>Add to On Call pool</Button>
                <Button>Remove</Button>
            </List.Content>
            <List.Content>
                Molly
      </List.Content>
        </List.Item>
    </List>
}

class Workers extends Component {
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
                    <Grid centered columns='equal'>
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
                            <Grid.Column>
                                <GenericList />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}
export default Workers;