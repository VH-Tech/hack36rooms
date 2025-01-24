import React, { Component } from "react";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowOthersToEdit: false,
      isHost: false,
      add_announcements_content: "",
      announs:"",
      file: null,
    };
    this.data=[]
    this.roomCode = this.props.match.params.roomCode;
    const s = this.props.location.search;
    const queryParams = new URLSearchParams(s)
    this.hostKey = queryParams.get("host_key")
    this.getRoomDetails();

    this.handleContentChange = this.handleContentChange.bind(this);
    this.submitButtonPressed= this.submitButtonPressed.bind(this);
    
  }


  getRoomDetails() {
    console.log(this.hostKey)
    fetch("/api/get-room" + "?code=" + this.roomCode+ "&host_key=" + this.hostKey)
      .then((response) => response.json())
      .then((data) => {

        this.setState({
          announs : JSON.parse(data.announcements),
          allowOthersToEdit: data.allow_others_to_edit,
          isHost: data.is_host,
        });
        console.log(this.state.announs[0])
        console.log(this.state.isHost)
      });

  }

  render() {
    return (
      <div>
        {/* <h3>{this.roomCode}</h3>
        <p>Others Can edit ? : {this.state.allowOthersToEdit.toString()}</p>
        <p>Host: {this.state.isHost.toString()}</p> */}



          <div class="split left">
            <div class="centered">
        { this.state.isHost?
        <>
        <div className="mb-3">
        <h2 className="display-4 text-white" style={{fontFamily:"monospace"}}>Add Announcement</h2>
        </div>
        <div className="mb-3">
        <h4 for="exampleFormControlTextarea1" style={{fontFamily:"monospace"}} className="form-label my-3 text-white">Content :</h4>
        <textarea className="form-control" id="content" onChange ={this.handleContentChange} rows="3"></textarea>
        </div>
        <div class="col-auto my-3 py-3">
        <button type="button" className="btn btn-light" onClick={this.submitButtonPressed} style={{fontFamily:"monospace"}}>Add Announcement</button>
        </div></>:<h4 style={{fontFamily:"monospace"}} className="display-3 text-white">Announcements:</h4>

  }
        <ul className="list-group py-4 mx-10">
          <li className="list-group-item active" aria-current="true">{this.state.announs[0]}</li>
          <li className="list-group-item list-group-item-secondary" >{this.state.announs[1]}</li>
          <li className="list-group-item list-group-item-secondary">{this.state.announs[2]}</li>
          <li className="list-group-item list-group-item-secondary">{this.state.announs[3]}</li>
          <li className="list-group-item list-group-item-secondary">{this.state.announs[4]}</li>
          <li className="list-group-item list-group-item-secondary">{this.state.announs[5]}</li>
          <li className="list-group-item list-group-item-secondary">{this.state.announs[6]}</li>
          <li className="list-group-item list-group-item-secondary">{this.state.announs[7]}</li>
          <li className="list-group-item list-group-item-secondary">{this.state.announs[8]}</li>
          <li className="list-group-item list-group-item-secondary">{this.state.announs[9]}</li>
        </ul>
              
            </div>
          </div>

          <div class="split right">
            <div class="centered">
              {this.state.isHost?
            <iframe frameBorder="0" src={"/api/upload-file?code=" + this.roomCode + "&isHost=" + this.state.isHost} height="800" width="800" title="Iframe Example"></iframe>:
            <iframe frameBorder="0" src={"/api/upload-file?code=" + this.roomCode} height="800" width="800" title="Iframe Example"></iframe>
              }
           </div>
          </div>
      </div>
    );
  }



  handleContentChange(e){
    this.setState({
      add_announcements_content: e.target.value
    });
  }

  submitFileButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code : this.roomCode,
        announ : this.state.add_announcements_content,
      }),
    };
    fetch("/api/add-announcement", requestOptions)
      .then((response) => response.json())
      .then((data) => {this.getRoomDetails()});
  }

  submitButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code : this.roomCode,
        announ : this.state.add_announcements_content,
      }),
    };
    fetch("/api/add-announcement", requestOptions)
      .then((response) => response.json())
      .then((data) => {this.getRoomDetails()});
  }

}
