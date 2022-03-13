import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Gropus from './Gropus';

export default class sidePanel extends Component {
    render() {
        return (
            <Menu size='large' vertical style={{ background: 'rgb(231, 53, 111', height:'100%' }}>
                <UserPanel userName={this.props.userName}></UserPanel>
                <Gropus userName={this.props.userName} />
            </Menu>
        )
    }
}
