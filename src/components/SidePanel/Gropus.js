import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentGroup } from '../../actions';
import { Header, Icon, Modal, Button, Form, Message, Menu, Item } from 'semantic-ui-react';
import { getDatabase, ref, set, push, onValue } from '../../FirebaseConfig';

class Gropus extends Component {

    state = {
        groups: [],
        modal: false,
        groupname: '',
        grouptagline: '',
        err: '',
        firstLoad: true,
        active: ''
    }

    openModal = () => {
        this.setState({ modal: true })
    }

    closeModal = () => {
        this.setState({ modal: false })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.isFormValid(this.state)) {


            const db = getDatabase();
            const groupRef = ref(db, 'groups');
            const newGroup = push(groupRef);
            set(newGroup, {
                groupname: this.state.groupname,
                grouptagline: this.state.grouptagline,
                createdBy: this.props.userName
            }).then(() => {
                this.setState({ modal: false })
                this.setState({ groupname: '' })
                this.setState({ grouptagline: '' })
                this.setState({ err: '' })
            })
        } else {
            this.setState({ err: " Please Fill in the information above" })
        }
    }

    isFormValid = ({ groupname, grouptagline }) => {
        if (groupname && grouptagline) {
            return true
        } else {
            return false
        }
    }

    componentDidMount() {
        let groupsAfterLoad = []
        const db = getDatabase();
        const groupRef = ref(db, 'groups');
        onValue(groupRef, (snapshot) => {
            groupsAfterLoad = []
            snapshot.forEach((item) => {
                console.log(item.key)
                let groupData = {
                    id: item.key,
                    groupname: item.val().groupname,
                    grouptagline: item.val().grouptagline,
                    createdBy: item.val().createdBy
                }

                groupsAfterLoad.push(groupData)
            })

            this.setState({ groups: groupsAfterLoad }, this.addGroupOnLoad)
        });

    }



    addGroupOnLoad = () => {
        let firstGroup = this.state.groups[0]
        if (this.state.firstLoad && this.state.groups.length > 0) {
            this.props.setCurrentGroup(firstGroup)
            // console.log(firstGroup.id)
            this.setState({ active: firstGroup.id })
        }
        this.setState({ firstLoad: false })
    }

    groupChange = (group) => {
        this.setState({ active: group.id })
        this.props.setCurrentGroup(group)
    }

    render() {
        return (
            <div>
                <Header style={{ color: '#fff', marginLeft: '5px', marginTop: '30px', fontSize: '16px' }}>
                    <Icon name="group" style={{ display: 'inline-block', fontSize: '18px' }} /> Groups({this.state.groups.length})
                    <Icon onClick={this.openModal} name="add circle" style={{cursor:'pointer', marginLeft: '30px', fontSize: '18px', display: 'inline-block' }}>
                    </Icon>
                </Header>


                <Menu text vertical style={{ color: '#fff',cursor:'pointer', marginLeft: '5px', marginTop: '10px', fontSize: '12px' }} >

                    {this.state.groups.map((item) => (
                        <Item style={item.id === this.state.active ? menuListActive : menuList} onClick={() => this.groupChange(item)} header >
                            {item.groupname}
                        </Item>
                    ))}
                </Menu>

                <Modal
                    basic
                    onClose={false}
                    onOpen={true}
                    open={this.state.modal}
                    size='small'
                >

                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label style={{ color: '#fff' }}>Group Name</label>
                                <input onChange={this.handleChange} name='groupname' placeholder='Group Name' />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ color: '#fff' }}>Group Tagline</label>
                                <input onChange={this.handleChange} name='grouptagline' placeholder='Group Tagline' />
                            </Form.Field>
                        </Form>
                        {this.state.err ? <Message warning>
                            <Message.Header>{this.state.err}</Message.Header>
                        </Message> : ""}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' inverted onClick={this.handleSubmit} >
                            <Icon name='checkmark' /> Add Group
                        </Button>
                        <Button basic color='red' onClick={this.closeModal} inverted >
                            <Icon name='remove' /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div >
        )
    }
}

let menuList = {
    fontSize: '12px',
    marginTop: '5px',
    marginLeft: '5px',
    color: '#fff',

}
let menuListActive = {
    fontSize: '15px',
    marginTop: '5px',
    color: '#c42154',
    background: '#fff',
    padding: '5px',
    textAlign:'center'

}


export default connect(null, { setCurrentGroup })(Gropus)