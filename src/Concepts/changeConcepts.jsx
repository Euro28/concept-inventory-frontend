import React, { useEffect, useState } from "react";
import axios from "axios";
import Toolbar from "../Dashboard/dashboardToolbar.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useLocation } from "react-router-dom";
import _ from "lodash";

const ChangeConcept = () => {
  const [concepts, setConcepts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [test, setTest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const location = useLocation();

  useEffect(() => {
    const getConcepts = async () => {
      setLoading(true);
      const quiz = await axios.get("/api/questions");

      const quizConcepts = quiz.data.find(
        (quiz) => quiz.title === location.state.quizTitle
      ).concepts;

      const userConcepts = await axios.get("/api/userConcepts");


      const correctUserConcept = userConcepts.data.find(
        (quiz) => quiz.title === location.state.quizTitle
      ).concepts;

      const checkedConcepts = _.intersection(correctUserConcept, quizConcepts);

      console.log("checkedCocept", checkedConcepts);
      setChecked(checkedConcepts);
      setConcepts(quizConcepts);
      setLoading(false);
    };

    getConcepts();
  }, []);

  const setNewConcepts = async (e) => {
    e.preventDefault();

    try {
      await axios.patch("/api/setUserConcepts", {
        concepts: checked,
        title: location.state.quizTitle,
      });
      await axios.patch("/api/takenQuiz", {
        taken: false,
      });

      setSuccess(
        "SUCCESS! Updated Concepts that will appear on your next quiz!"
      );
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError(
        "Could not recalibrate concepts please try again or contact Euro"
      );
    }
  };

  const handleCheck = (e) => {
    let checkedCopy = checked;

    if (e.target.checked) {
      checkedCopy.push(e.target.id);
    } else {
      checkedCopy = checkedCopy.filter((concept) => concept !== e.target.id);
    }

    setChecked(checkedCopy);
    setTest(!test); //purpose of this is to make dom reset its really hacky
  };

  return (
    <div>
      <Toolbar />
      {!loading && (
        <>
          <h1>
            Select Concepts you would like to appear when testing{" "}
            {location.state.quizTitle}
          </h1>
          <Form onSubmit={setNewConcepts}>
            {concepts.map((concept) => (
              <div key={concept}>
                <Form.Check
                  type={"checkbox"}
                  id={concept}
                  label={concept}
                  checked={checked.includes(concept)}
                  onChange={handleCheck}
                />
              </div>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      )}
      {success && <Alert variant="success"> {success}</Alert>}
      {error && <Alert variant="danger"> {error}</Alert>}
    </div>
  );
};

export default ChangeConcept;
