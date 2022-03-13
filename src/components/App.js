import { Component } from "react";
import { getAuth } from "../FirebaseConfig";
import { connect } from "react-redux";
import { setuser, clearuser } from "../actions";
import { Dimmer, Loader, Segment, Grid } from 'semantic-ui-react'
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Metapanel from "./MetaPanel/MetaPanel";
import Message from "./Message/Message"




class App extends Component {




  componentDidMount() {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setuser(user)
      } else {
        this.props.clearuser()
      }
    })
  }

  render() {


    console.log()

    return this.props.isLoading ?

      <Segment style={{ height: "100vh" }}>
        <Dimmer active>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
      </Segment>
      :

      (
        <>
          <Grid columns='equal' >

            <Grid.Column style={{ width: '5%' }}>
              <ColorPanel></ColorPanel>
            </Grid.Column>

            <Grid.Column style={{ width: '20%' }}>
              <SidePanel userName={this.props.userName.displayName}></SidePanel>
            </Grid.Column>

            <Grid.Column style={{ width: '40%' }} >
              <Message userId={this.props.userName} groupId={this.props.groupId}></Message>
            </Grid.Column>

            <Grid.Column style={{ width: '35%' }} >
              <Metapanel></Metapanel>
            </Grid.Column>

          </Grid>
        </>
      );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
  userName: state.user.currentUser,
  groupId : state.group.currentGroup

})

export default connect(mapStateToProps, { setuser, clearuser })(App); 
