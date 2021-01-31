import React, { useEffect, useState } from "react";
import axios from "axios";
import Toolbar from "../Dashboard/dashboardToolbar.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const ChangeConcept = () => {
  const [concepts, setConcepts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [test, setTest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const getConcepts = async () => {
      setLoading(true);
      const concept = await axios.get("/api/concepts");
      const userConcepts = await axios.get("/api/userConcepts");

      const listOfConcepts = Object.keys(concept.data);

      const checkedConcepts = {};
      listOfConcepts.forEach((concept) => {
        checkedConcepts[concept] = userConcepts.data.includes(concept);
      });

      setChecked(checkedConcepts);
      setConcepts(listOfConcepts);
      setLoading(false);
    };

    getConcepts();
  }, []);

  const setNewConcepts = async (e) => {
    e.preventDefault();
    const newConcepts = Object.keys(checked).filter(
      (concept) => checked[concept]
    );

    try {
      await axios.patch("/api/setUserConcepts", {
        concepts: newConcepts,
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
    const checkedCopy = checked;
    checkedCopy[e.target.id] = e.target.checked;

    setChecked(checkedCopy);
    setTest(!test); //purpose of this is to make dom reset its really hacky
  };

  return (
    <div>
      <Toolbar />
      {!loading && (
        <>
          <h1>
            Please select what concepts you want to appear on your next test.
          </h1>
          <Form onSubmit={setNewConcepts}>
            {concepts.map((concept) => (
              <div key={concept}>
                <Form.Check
                  type={"checkbox"}
                  id={concept}
                  label={concept}
                  checked={checked[concept]}
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
