import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";

const DashboardToolbar = (props) => {
  const history = useHistory();

  const logout = () => {
    Cookies.remove("name");
    history.push("/");
  };

  const dashboard = () => {
    history.push("/dashboard");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand> Concept Inventory</Navbar.Brand>
        <Nav>
          <Button onClick={() => dashboard()}> Dashboard </Button>
        </Nav>
        <Nav className="nav navbar-nav ml-auto">
          <Button onClick={() => logout()}>Log out</Button>
        </Nav>
      </Navbar>
    </>
  );
};

export default DashboardToolbar;

