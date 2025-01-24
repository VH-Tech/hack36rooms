import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import ClassesPage from "./ClassesPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }



  renderHomePage() {
    return (
      <Grid container spacing={3} className="center">
        <Grid item xs={12} align="center">
          <Typography style={{fontFamily:"monospace"}} variant="h3" compact="h3">
            Study Rooms
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button style={{fontFamily:"monospace"}} color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button style={{fontFamily:"monospace"}} color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
            <Button style={{fontFamily:"monospace"}} color="dark" to="/classes" component={Link}>
              Join a Class
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => { return this.renderHomePage()}}/>
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/create" component={CreateRoomPage} />
          <Route path="/classes" component={ClassesPage} />
          <Route path="/room/:roomCode" component={Room} />
        </Switch>
      </Router>
    );
  }
}
