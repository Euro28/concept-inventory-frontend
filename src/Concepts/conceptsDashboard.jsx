import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toolbar from "../Dashboard/dashboardToolbar.jsx";
import { useHistory } from "react-router-dom";

const ConceptsDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");

  const history = useHistory();

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const quizzes = await axios.get("/api/questions");

        setQuizzes(quizzes.data);
      } catch (err) {
        console.log("could not retrieve quizzes for concepts");
      }
    };

    getQuizzes();
  }, []);

  const changeConcept = (e) => {
    e.preventDefault();

    history.push({
      pathname: "/changeConcepts",
      state: {
        quizTitle,
      },
    });
  };

  return (
    <>
      <Toolbar />
      <Form onSubmit={changeConcept}>
        <Form.Group>
          <Form.Control
            as="select"
            size="lg"
            onChange={(e) => setQuizTitle(e.target.value)}
            value={quizTitle}
          >
            <option>select a subject to calibrate concepts</option>
            {quizzes.map((quiz) => (
              <option key={quiz.title}> {quiz.title}</option>
            ))}
          </Form.Control>
          <br />
        </Form.Group>
        <Button variant="primary" type="submit">
          Calibrate Concepts for Selected Subject
        </Button>
      </Form>
    </>
  );
};

export default ConceptsDashboard;
