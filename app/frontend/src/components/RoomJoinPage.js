import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
      hostKey: "",
      error: "",
    };
    this.handleRoomFieldChange = this.handleRoomFieldChange.bind(this);
    this.handleHostFieldChange = this.handleHostFieldChange.bind(this);
    this.roomButtonPressed = this.roomButtonPressed.bind(this);
  }

  render() {
    return (
      <Grid container spacing={1} className="center">
        <Grid item xs={12} align="center">
          <Typography style={{fontFamily:"monospace"}} variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={this.state.error}
            label="Code"
            placeholder="Enter a Room Code"
            value={this.state.roomCode}
            helperText={this.state.error}
            variant="outlined"
            style={{fontFamily:"monospace"}}
            onChange={this.handleRoomFieldChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            label="Host Key"
            style={{fontFamily:"monospace"}}
            placeholder="Enter a key"
            value={this.state.hostKey}
            helperText="leave blank for guest"
            variant="outlined"
            onChange={this.handleHostFieldChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
          style={{fontFamily:"monospace"}}
            variant="contained"
            color="primary"
            onClick={this.roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button style={{fontFamily:"monospace"}} variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  handleRoomFieldChange(e) {
    this.setState({
      roomCode: e.target.value,
    });
  }

  handleHostFieldChange(e) {
    this.setState({
      hostKey: e.target.value,
    });
  }

  roomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: this.state.roomCode,
        host_key : this.state.hostKey,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          this.props.history.push(`/room/${this.state.roomCode}?host_key=${this.state.hostKey}`);
        } else {
          this.setState({ error: "Room not found." });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
