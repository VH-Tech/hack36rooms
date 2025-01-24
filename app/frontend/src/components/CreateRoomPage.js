import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class CreateRoomPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      OthersCanEdit: true,
      hostKey: "",
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleHostKeyChanged = this.handleHostKeyChanged.bind(this);
    
  }

  handleHostKeyChanged(e) {
    this.setState({
      hostKey: e.target.value,
    });
  }

  handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host_key: this.state.hostKey,
        allow_others_to_edit: this.state.OthersCanEdit,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push("/room/" + data.code +"?host_key="+ data.host_key));
  }

  render() {
    return (
      <Grid container spacing={1} className="center">
        <Grid item xs={12} align="center">
          <Typography component="h4" style={{fontFamily:"monospace"}} variant="h4">
            Create A Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="text"
              onChange={this.handleHostKeyChanged}
              defaultValue=""
              inputProps={{
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div align="center" style={{fontFamily:"monospace"}}>Host key to join as admin</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleRoomButtonPressed}
            style={{fontFamily:"monospace"}}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link} style={{fontFamily:"monospace"}}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}
