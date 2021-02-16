import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toolbar from "../../Dashboard/dashboardToolbar.jsx";
import { useHistory } from "react-router-dom";

const AdminResultsDashboard = () => {
  const [adminSubjectChoice, setAdminSubjectChoice] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [allQuizzes, setAllQuizzes] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getResults = async () => {
      try {
        const allQuizzes = await axios.get("/api/questions");
        const allResults = await axios.get("/api/allResults");

        setAllResults(allResults.data);
        setAllQuizzes(allQuizzes.data);
      } catch (err) {
        console.log("something went wrong with getting all results");
      }
    };

    getResults();
  }, []);

  const showResults = (e) => {
    e.preventDefault();
    const quiz = allQuizzes.find((quiz) => quiz.title === adminSubjectChoice);

    const userResults = allResults.map((user) => {
      return {
        name: user.name,
        quizResults: user.results.filter(
          (result) => result.quizTitle === adminSubjectChoice
        ),
      };
    });

    history.push({
      pathname: "/allResults",
      state: { quiz, userResults },
    });
  };

  return (
    <>
      <Toolbar />
      <Form onSubmit={showResults}>
        <Form.Group
          as="select"
          size="lg"
          onChange={(e) => setAdminSubjectChoice(e.target.value)}
          value={adminSubjectChoice}
        >
          <option>Select Subject to view results</option>
          {allQuizzes.map((quiz) => (
            <option key={quiz.title}> {quiz.title}</option>
          ))}
        </Form.Group>
        <Button variant="primary" type="submit">
          View Results
        </Button>
      </Form>
    </>
  );
};

export default AdminResultsDashboard;
