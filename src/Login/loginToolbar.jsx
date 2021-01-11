import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

const loginToolbar = () => (
  <Navbar bg="light" expand>
    <Navbar.Brand> Concept Inventory</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/"> Login </Nav.Link> 
      <Nav.Link href="/register"> Register </Nav.Link>
    </Nav>
  </Navbar>
)

export default loginToolbar;