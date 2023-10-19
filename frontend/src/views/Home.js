import React, { Component } from "react";
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {

  // Ottieni l'anno corrente
  const currentYear = new Date().getFullYear();
    return (
      <div className='container-fluid d-flex justify-content-center flex-column text-center vh-100'>
            <h1>App Students</h1>
            <span>Created By : <strong>Michele Porcaro | {{currentYear}}</strong></span>
        </div>
    );
  }
}
