import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toolbar from "../Dashboard/dashboardToolbar.jsx";
import { useHistory } from "react-router-dom"

const EditDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [quiz, setQuiz] = useState({});
  const history = useHistory();

  useEffect(() => {
    const getSubject = async () => {
      try {
        const subject = await axios.get("/api/questions");

        setSubjects(subject.data);
      } catch (err) {
        console.log("something went wrong with getting subjects");
      }
    };

    getSubject();
  }, []);

  const gotoSubject = (e) => {
    e.preventDefault();

    const questions = subjects.find((subject) => subject.title === quiz);

    history.push({
      pathname: "/makeQuiz",
      state: {questions}
    })

  };

  return (
    <>
      <Toolbar />
      <Form onSubmit={gotoSubject}>
        <Form.Group>
          <Form.Control
            as="select"
            size="lg"
            onChange={(e) => setQuiz(e.target.value)}
            value={quiz}
          >
            <option>Select a Concept Inventory to edit</option>
            {subjects.map((subject) => (
              <option key={subject.title}> {subject.title}</option>
            ))}
          </Form.Control>
          <br />
        </Form.Group>
        <Button variant="primary" type="submit">
          Select
        </Button>
      </Form>
    </>
  );
};

export default EditDashboard;
