import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { LinkContainer } from "react-router-bootstrap";

const DashboardToolbar = () => {
  const history = useHistory();

  return (
    <>
      <Navbar bg="light" expand>
        <LinkContainer to="/dashboard">

        <Navbar.Brand> Concept Inventory</Navbar.Brand>
        </LinkContainer>
        <Nav className="nav navbar-nav ml-auto">
          <LinkContainer to="/">
            <Button onClick={() => Cookies.remove("name")}>Log out</Button>
          </LinkContainer>
        </Nav>
      </Navbar>
    </>
  );
};

export default DashboardToolbar;
