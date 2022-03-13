import React, { Component } from 'react'
import { Comment, Segment } from 'semantic-ui-react'
import MessageForm from './MessageForm';
import MessageHeader from './MessageHeader';

import { getDatabase, ref, onChildAdded, onChildChanged } from "../../FirebaseConfig";


export default class message extends Component {


    state = {
        groupMessage: []
    }

    componentDidUpdate(previousProp) {

        let messageArr = []

        const db = getDatabase();
        const commentsRef = ref(db, 'messages/' + this.props.groupId.id);

        onChildAdded(commentsRef, (data) => {
            messageArr = []
            data.forEach((item) => {
                messageArr.push(item.val())
            })
            if (previousProp.groupId) {

                if (previousProp.groupId.groupname !== this.props.groupId.groupname) {
                    this.setState({ groupMessage: messageArr })
                }
            } else {
                this.setState({ groupMessage: messageArr })
            }
        });

        onChildChanged(commentsRef, (data) => {
            messageArr = []
            data.forEach((item) => {
                messageArr.push(item.val())
            })
            if (previousProp.groupId) {

                if (previousProp.groupId.groupname !== this.props.groupId.groupname) {
                    this.setState({ groupMessage: messageArr })
                }
            } else {
                this.setState({ groupMessage: messageArr })
            }
        });

    }


    render() {

        return (
            <div>
                <Segment>
                    <MessageHeader />
                </Segment>
                <Segment style={{ height: '270px', overflowY: 'scroll' }}>
                    <Comment.Group>
                        {this.state.groupMessage.map((item) => (
                            <h5>{item.msg}</h5>
                        ))}
                    </Comment.Group>
                </Segment>
                <Segment>
                    <MessageForm userId={this.props.userId} groupId={this.props.groupId} />
                </Segment>
            </div>
        )
    }
}
