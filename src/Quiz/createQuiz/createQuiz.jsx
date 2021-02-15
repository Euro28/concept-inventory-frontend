import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Toolbar from "../../Dashboard/dashboardToolbar.jsx";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState("");

  const submitTitle = async (e) => {
    e.preventDefault();

    try {
      const newQuiz = await axios.post("/api/newQuiz", {
        title,
      });

      setSuccess(`Succesfully added new Concept inventory under ${title}`);
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (err) {
      console.log("something went wrong with adding new concept inventory");
    }
  };

  return (
    <>
      <Toolbar />
      <Form onSubmit={submitTitle}>
        <Form.Group controlId="quizName">
          <Form.Label> Subject </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {success && <Alert variant="success">{success}</Alert>}
    </>
  );
};

export default CreateQuiz;
