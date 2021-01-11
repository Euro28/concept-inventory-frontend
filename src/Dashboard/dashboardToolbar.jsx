import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"

const dashboardToolbar = (props) => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand> Concept Inventory</Navbar.Brand>
    <Nav className="nav navbar-nav ml-auto">
      <Button onClick={() => props.logout()}>Log out</Button>
    </Nav>
  </Navbar>
)

export default dashboardToolbar;