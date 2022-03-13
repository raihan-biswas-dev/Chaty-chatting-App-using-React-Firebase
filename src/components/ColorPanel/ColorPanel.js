import React, { Component } from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Divider, Button } from 'semantic-ui-react'

export default class colorPanel extends Component {
    render() {
        return (
            <div>
                <Sidebar
                    as={Menu}
                    icon='labeled'
                    inverted
                    vertical
                    visible
                    width='very thin'
                >
                    <Divider />
                    <Button icon='add' size='small' style={{ background: '#E7356F', color:'#fff'}} ></Button>
            </Sidebar>
            </div >
        )
    }
}
