import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toolbar from "../Dashboard/dashboardToolbar.jsx";
import { useHistory } from "react-router-dom";
import _ from "lodash";

const SelectResults = () => {
  const [userSubjectChoice, setUserSubjectChoice] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [userResults, setUserResults] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getUserResults = async () => {
      try {
        const userRes = await axios.get("/api/results");
        const completedSubjects = _.uniq(
          userRes.data.map((res) => res.quizTitle)
        );

        setUserResults(userRes.data);
        setSubjects(completedSubjects);
      } catch (err) {
        console.log("something went wrong with retrieving userresults");
      }
    };

    getUserResults();
  }, []);

  const gotoResults = (e) => {
    e.preventDefault();

    const results = userResults.filter(
      (result) => result.quizTitle === userSubjectChoice
    );

    history.push({
      pathname: "/results",
      state: { results, quizTitle: userSubjectChoice },
    });
  };

  return (
    <>
      <Toolbar />
      <Form onSubmit={gotoResults}>
        <Form.Group>
          <Form.Control
            as="select"
            size="lg"
            onChange={(e) => setUserSubjectChoice(e.target.value)}
            value={userSubjectChoice}
          >
            <option> Select Subject to view results</option>
            {subjects.map((subject) => (
              <option key={subject}> {subject}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          View Results
        </Button>
      </Form>
    </>
  );
};

export default SelectResults;
