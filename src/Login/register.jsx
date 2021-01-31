import React, { useState } from "react";
import axios from "axios";

import Alert from "react-bootstrap/Alert";
import LoginToolbar from "./loginToolbar.jsx";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");

  const submitName = async (e) => {
    e.preventDefault();
    try {
      const concepts = await axios.get("/api/concepts")

      const register = await axios.post("/api/register", {
        name,
        conceptsToTake: Object.keys(concepts.data)
      });
      if (register.status === 201) {
        setAlert("success");
        setName("");
      }
    } catch (err) {
      setAlert("exists");
    }
  };

  const renderAlert = () => {
    const alertVariant = alert === "success" ? alert : "danger";
    let alertText =
      alert === "success"
        ? `Succesfully registered user`
        : `User by that name already exists`;

    return (
      <Alert variant={alertVariant} dismissible onClose={() => setAlert("")}>
        {alertText}
      </Alert>
    );
  };

  return (
    <>
      <LoginToolbar />
      <div className="Registration">
        <h1> Register </h1>
        <Form onSubmit={(e) => submitName(e)}>
          <Form.Group controlId="formname">
            <Form.Label> username</Form.Label>
            <Form.Control
              type="name"
              placeholder="enter name"
              onChange={(e) => {
                setName(e.target.value);
                setAlert("");
              }}
            />
            <Form.Text className="text-muted">register a name first</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        {alert && renderAlert()}
      </div>
    </>
  );
};

export default Register;
