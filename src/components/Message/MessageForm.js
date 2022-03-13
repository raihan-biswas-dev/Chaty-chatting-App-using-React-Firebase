import React, { Component } from 'react';
import { Input, Button, Message } from 'semantic-ui-react'
import { getDatabase, ref, set, push, child } from '../../FirebaseConfig';

export default class MessageForm extends Component {



    state = {
        msg: '',
        err: ''
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }



    handleSubmit = () => {
        if (this.state.msg) {


            const db = getDatabase();
            const groupRef = ref(db, 'messages');
            const newGroup = push(child(groupRef, `${this.props.groupId.id}/${this.props.userId.uid}`));
            set(newGroup, {
                msg: this.state.msg,
                date: Date()
            }).then(() => {
                console.log("message goes in database")
            })


            this.setState({ err: '' })
        } else {
            this.setState({ err: 'write something' })
        }
    }


    render() {

        return (
            <div>
                <Input onChange={this.handleChange} name='msg' style={{ width: '100%', marginBottom: '20px' }} placeholder='Aa' />
                {this.state.err ? <Message negative>
                    <Message.Header>{this.state.err}</Message.Header>
                </Message> : ""
                }
                <Button onClick={this.handleSubmit} primary style={{ width: '49%' }}>Add Message</Button>
                <Button secondary style={{ width: '49%' }}>Add Media</Button>

            </div>
        )
    }
}
