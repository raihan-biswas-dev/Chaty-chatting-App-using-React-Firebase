import React, { Component } from 'react';
import { Button, Form, Grid, Segment, Message, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, getDatabase, ref, set } from '../../FirebaseConfig';

export default class Register extends Component {


    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errMsg: '',
        successMsg: '',
        loader: false,
    }

    handleChange = (e) => {
        // console.log(e.target.name);
        this.setState({ [e.target.name]: e.target.value })
    }


    isFormEmpty = ({ username, email, password, confirmPassword }) => {
        if (!username.length || !email.length || !password.length || !confirmPassword.length) {
            this.setState({ errMsg: ' Fill The All Fields' })
        } else if (password.length < 8 || confirmPassword.length < 8) {
            this.setState({ errMsg: 'Password should be greater then 8' })
        } else if (password !== confirmPassword) {
            this.setState({ errMsg: 'Password does not matched' })
        } else {
            return true;
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        if (this.isFormEmpty(this.state)) {
            this.setState({ loader: true })


            createUserWithEmailAndPassword(getAuth(), this.state.email, this.state.password)
                .then((userCredential) => {
                    // console.log(userCredential.user.uid)
                    updateProfile(getAuth().currentUser, {
                        displayName: this.state.username
                    }).then(() => {
                        this.writeUserData(userCredential)
                    }).then(() => {
                        this.setState({ username: '' })
                        this.setState({ email: '' })
                        this.setState({ password: '' })
                        this.setState({ confirmPassword: '' })
                        this.setState({ errMsg: '' })
                        this.setState({ successMsg: 'Your user registration was successful' })
                        this.setState({ loader: false })
                    }).catch((error) => {
                        const errorCode = error.code;
                        if (errorCode) {
                            this.setState({ errMsg: 'Username not valid' })
                        }
                    })
                })
                .catch((error) => {
                    this.setState({ loader: false })
                    const errorCode = error.code;
                    if (errorCode.includes('email')) {
                        this.setState({ errMsg: 'Email already in use' })
                    }
                });
        }
    }
    writeUserData = (user) => {
        const db = getDatabase();
        set(ref(db, 'users/' + user.user.uid), {
            UserName: this.state.username
        });
    }


    render() {

        const { username, email, password, confirmPassword, errMsg, successMsg, loader } = this.state
        return (
            <Grid textAlign='center' verticalAlign='center' style={{ paddingTop: '40px' }}>
                <Grid.Column style={{ maxWidth: '500px' }}>
                    <Header as='h1' icon style={{ color: '#E7356F' }}>
                        <Icon name='chat' />
                        Let's Start with Chaty
                    </Header>
                    <Segment raised>


                        {/* Message Positive */}

                        {errMsg ? <Message error>
                            <Message.Header>{errMsg}</Message.Header>
                        </Message> : ''}

                        {/* Message Error */}
                        {successMsg ? <Message positive>
                            <Message.Header>{successMsg}</Message.Header>
                        </Message> : ''}


                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label style={{ textAlign: 'left' }}> <Icon name='user' />Username</label>
                                <input placeholder='Username' type='text' onChange={this.handleChange} name='username' value={username} />
                            </Form.Field>
                            <Form.Field className={errMsg.includes("Email") ? 'error' : ''} >
                                <label style={{ textAlign: 'left' }}><Icon name='mail' />Email</label>
                                <input placeholder='Your email' type='text' onChange={this.handleChange} name='email' value={email} />
                            </Form.Field>
                            <Form.Field className={errMsg.includes("Password") ? 'error' : ''}>
                                <label style={{ textAlign: 'left' }}><Icon name='lock' />Password</label>
                                <input placeholder='Password' type='password' onChange={this.handleChange} name='password' value={password} />
                            </Form.Field>
                            <Form.Field className={errMsg.includes("Password") ? 'error' : ''}>
                                <label style={{ textAlign: 'left' }}><Icon name='repeat' />Confirm Password</label>
                                <input placeholder='Confirm Password' type='password' onChange={this.handleChange} name='confirmPassword' value={confirmPassword} />
                            </Form.Field>
                            <Button className={loader ? 'loading primary' : ''} style={{ background: '#E7356F', color: '#fff' }} type='submit'>Submit</Button>
                        </Form>
                    </Segment>
                    <Message>
                        <Message.Header>Already Have An Account? <Link style={{ color: '#E7356F' }} to="/login">Log In</Link></Message.Header>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}
