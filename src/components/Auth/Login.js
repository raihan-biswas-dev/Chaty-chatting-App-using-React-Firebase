import React, { Component } from 'react'
import { Button, Form, Grid, Segment, Message, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from '../../FirebaseConfig'



export default class Login extends Component {

    state = {
        email: '',
        password: '',
        errMsg: '',
        loader: false,
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    isFormEmpty = ({ email, password }) => {
        if (!email.length || !password.length) {
            this.setState({ errMsg: ' Fill The All Fields' })
        } else if (password.length < 8) {
            this.setState({ errMsg: 'Password should be greater then 8' })
        } else {
            return true;
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        if (this.isFormEmpty(this.state)) {
            this.setState({ loader: true })
            signInWithEmailAndPassword(getAuth(), this.state.email, this.state.password)
                .then((userCredential) => {
                    this.setState({ loader: false })
                    console.log(userCredential)
                }).catch((error) => {
                    this.setState({ loader: false })
                    const errorCode = error.code;
                    if (errorCode.includes('user')) {
                        this.setState({ errMsg: 'Email does not matched' })
                    } else if (errorCode.includes('wrong-password')) {
                        console.log(errorCode)
                        this.setState({errMsg:'Password does not matched'})

                    }
                });
        }
    }



    render() {
        const { email, password, errMsg, loader } = this.state
        return (
            <Grid textAlign='center' verticalAlign='center' style={{ paddingTop: '40px' }}>
                <Grid.Column style={{ maxWidth: '500px' }}>
                    <Header as='h1' icon style={{ color: '#E7356F' }}>
                        <Icon name='sign in' />
                        Let's Start Chaty
                    </Header>
                    <Segment raised>


                        {/* Message Positive */}

                        {errMsg ? <Message error>
                            <Message.Header>{errMsg}</Message.Header>
                        </Message> : ''}


                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field className={errMsg.includes("Email") ? 'error' : ''} >
                                <label style={{ textAlign: 'left' }}><Icon name='mail' />Email</label>
                                <input placeholder='Your email' type='text' onChange={this.handleChange} name='email' value={email} />
                            </Form.Field>
                            <Form.Field className={errMsg.includes("Password") ? 'error' : ''}>
                                <label style={{ textAlign: 'left' }}><Icon name='lock' />Password</label>
                                <input placeholder='Password' type='password' onChange={this.handleChange} name='password' value={password} />
                            </Form.Field>
                            <Button className={loader ? 'loading primary' : ''} style={{ background: '#E7356F', color: '#fff' }} type='submit'>Submit</Button>
                        </Form>
                    </Segment>
                    <Message>
                        <Message.Header>Don't Have Account? <Link style={{ color: '#E7356F' }} to="/register">Sign Up</Link></Message.Header>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}
