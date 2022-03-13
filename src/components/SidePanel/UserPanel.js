import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react';
import { getAuth, signOut } from '../../FirebaseConfig';

export default class UserPanel extends Component {

    dropOptions = () => [
        {
            text: <span> Loged as{this.props.userName}</span>,
            disabled: true
        },
        {
            text: <span>Change Profile</span>
        },
        {
            text: <span onClick={this.handleLogOut}>Log Out</span>
        },
    ]


    handleLogOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log('Log Out')
        }).catch((error) => {
            console.log(error)
        });
    }


    render() {
        return (

            <Grid>
                <Grid.Column>
                    <Grid.Row>
                        <Header as='h2' style={{ color: '#fff', marginLeft: '80px', marginTop: '20px', fontSize: '40px' }}>Chaty</Header>
                    </Grid.Row>
                    <Header as='h4'>
                        <Dropdown style={{ color: '#fff', marginLeft: '80px', marginTop: '20px', fontSize: '16px' }} trigger={
                            <h4 style={{ display: 'inline' }}>{this.props.userName}</h4>
                        } options={this.dropOptions()}></Dropdown>
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}
