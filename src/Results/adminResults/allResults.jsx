import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultsTable from "./resultsTable.jsx";
import Spinner from "../../Quiz/Spinner.jsx";
import Toolbar from "../../Dashboard/dashboardToolbar.jsx";
import markResults from "./markResults.js";
import { useLocation } from "react-router-dom";
import ConceptBarChart from "./conceptBarChart.js";
import Form from "react-bootstrap/Form";

const AllResults = () => {
  const [results, setResults] = useState([]);
  const [concepts, setConcepts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const location = useLocation();

  useEffect(() => {
    const getAllResults = async () => {
      try {
        setLoading(true);

        const concept = await axios.get("/api/concepts");

        const result = location.state.userResults.map((user) => ({
          results: user.quizResults.map((attempt) =>
            markResults(attempt.quizResults, location.state.quiz)
          ),
          name: user.name,
          userClass: user.userClass,
        }));

        setConcepts(Object.keys(concept.data));
        setResults(result);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getAllResults();
  }, []);

  return (
    <>
      <Toolbar />
      {loading ? (
        <Spinner />
      ) : (
        concepts &&
        results && (
          <div>
            <ResultsTable
              concepts={concepts}
              results={results}
              nameFilter={nameFilter}
              classFilter={classFilter}
            />
            <div>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label> Name: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="filter name"
                    onChange={(e) => setNameFilter(e.target.value)}
                    value={nameFilter}
                  />
                </Form.Group>
                <Form.Group controlId="formClass">
                  <Form.Label>Class:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="filter class"
                    onChange={(e) => setClassFilter(e.target.value)}
                    value={classFilter}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
        )
      )}
      {loading
        ? null
        : concepts &&
          results && (
            <ConceptBarChart
              concepts={concepts}
              results={results}
              nameFilter={nameFilter}
              classFilter={classFilter}
            />
          )}
    </>
  );
};

export default AllResults;
