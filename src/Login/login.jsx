import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import Register from "./register.jsx";
import LoginToolbar from "./loginToolbar.jsx";

const Login = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const loggedIn = async () => {
      try {
        const user = await axios.post("/api/login");
        if (user.status === 200) {
          logIn();
        }
      } catch (err) {}
    };

    loggedIn();
  }, []);

  const logIn = () => {
    history.replace({
      pathname: "/dashboard",
    });
  };

  const submitName = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await axios.post("/api/login", { name });
      setLoading(false);
      if (user.status === 200) {
        Cookies.set("name", name);
        logIn();
      } else {
        setError(true);
        setName("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <LoginToolbar />
      <div className="Login">
        <h1> Login </h1>
        <Form onSubmit={(e) => submitName(e)}>
          <Form.Group controlid="formname">
            <Form.Label> username</Form.Label>
            <Form.Control
              type="name"
              placeholder="enter name"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Text className="text-muted">register a name first</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form>
        {loading && (
          <Spinner animation="border" role="status">
            <span className="sr-only"> Loading... </span>
          </Spinner>
        )}

        {error && (
          <Alert variant={"danger"} dismissible onClose={() => setError(false)}>
            No such user exists
          </Alert>
        )}
      </div>
    </>
  );
};

export default Login;
