import React, { Component } from 'react';
import {
    Navbar,
    Form,
    Button,
    Nav,
    NavDropdown,
    FormControl
} from "react-bootstrap";
import "../App.css";

class Home extends Component {
    state = {}
    render() {
        return (
            <div className="App">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Memestagram</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Sign out</Nav.Link>
                            <NavDropdown title="Account Details" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Login details</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Followers</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Following</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Delete my account</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search for a user" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <header className="App-header">
                </header>
            </div>
        );
    }
}

export default Home;