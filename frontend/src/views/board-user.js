import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import ButtonElement from "../components/ButtonElement";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
        <ButtonElement
                text='Vai su Students'
                url='/students/'
                bgcolor='rgb(127, 255, 185)'
        />
        </header>
      </div>
    );
  }
}
