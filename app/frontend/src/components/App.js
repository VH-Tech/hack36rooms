import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import Header from "./Header";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      user:""
    }
    this.getUser();
  }

  getUser(){
    fetch("/api/get-user")
    .then((response) => response.json())
    .then((data) => {

      this.setState({
        user : data
      });
      console.log(this.state.user)
    });
  }

  render() {
    
    return (
      <>
      <Header title="StudyRooms" />
      <div className="mainbody">
        <HomePage className="center"/>
      </div>
      </>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
