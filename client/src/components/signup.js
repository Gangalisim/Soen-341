import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "../App.css";

//POST function that uses fetch to send our data.
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Success:", data);
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

class RenderSignUpForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    this.setState({
      res: data
    });
    postData("http://localhost:8000/signup", {
      email: data.get("email"),
      username: data.get("username"),
      password: data.get("password")
    }).then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                name="username"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {/* This is used for testing purposes to see what data is getting sent
                    {this.state.res && (
                        <div className="res-block">
                            <h3><br />Data that will be sent:</h3>
                            <pre>FormData {this.state.res}</pre>
                        </div>
                    )}
                    */}
        </header>
      </div>
    );
  }
}

export default RenderSignUpForm;
