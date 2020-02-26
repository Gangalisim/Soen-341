import React, { Component } from "react";
import { Form, Button, Jumbotron } from "react-bootstrap";
import axios from "axios";
import "../App.css";

class RenderLoginForm extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("http://localhost:8000/login", user)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ username: "", password: "" });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Log in</h1>
          <br />
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </header>
      </div>
    );
  }
}

export default RenderLoginForm;
