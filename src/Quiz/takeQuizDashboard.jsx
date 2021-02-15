import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toolbar from "../Dashboard/dashboardToolbar.jsx";
import { useHistory } from "react-router-dom";

const TakeQuizDashboard = () => {
  const [subject, setSubject] = useState("");
  const [quizzes, setQuizzes] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const quizzes = await axios.get("/api/questions");

        setQuizzes(quizzes.data);
      } catch (err) {
        console.log("could not retrieve subjects");
      }
    };
    getQuizzes();
  }, []);

  const takeQuiz = (e) => {
    e.preventDefault();

    const quiz = quizzes.find((quiz) => quiz.title === subject);

    history.push({
      pathname: "/takeQuiz",
      state: { quiz },
    });
  };

  return (
    <>
      <Toolbar />
      <Form onSubmit={takeQuiz}>
        <Form.Group>
          <Form.Control
            as="select"
            size="lg"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
          >
            <option>Select a subject to take</option>
            {quizzes.map((quiz) => (
              <option key={quiz.title}> {quiz.title}</option>
            ))}
          </Form.Control>
          <br />
        </Form.Group>
        <Button variant="primary" type="submit">
          Take Test
        </Button>
      </Form>
    </>
  );
};

export default TakeQuizDashboard;
