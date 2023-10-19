import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>Benvenuto {currentUser.username}</strong>
          </h3>
        </header>
        <h4 className="mb-5">I dati del tuo profilo :</h4>
        <p style={{ display: 'none' }}> 
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p style={{ display: 'none' }}>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Username:</strong>{" "}
          {currentUser.username}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Tipo di autorizzazione:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => 
            <li key={index}>
              {role === 'ROLE_USER' && 'Utente'}
              {role === 'ROLE_ADMIN' && 'Amministratore'}
              {role === 'ROLE_MODERATOR' && 'Moderatore'}
            </li>)}
        </ul>
      </div>: null}
      </div>
    );
  }
}
