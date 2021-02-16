import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultsTable from "./resultsTable.jsx";
import Spinner from "../../Quiz/Spinner.jsx";
import Toolbar from "../../Dashboard/dashboardToolbar.jsx";
import markResults from "./markResults.js";
import { useLocation } from "react-router-dom";

const AllResults = () => {
  const [results, setResults] = useState([]);
  const [concepts, setConcepts] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const getAllResults = async () => {
      try {
        setLoading(true);

        const concept = await axios.get("/api/concepts");
        const questions = location.state.quiz.pages[0].elements;

        const result = location.state.userResults.map((user) => ({
          results: user.quizResults.map((attempt) =>
            markResults(attempt.quizResults, location.state.quiz)
          ),
          name: user.name,
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
  results && <ResultsTable concepts={concepts} results={results} />
  )}
    </>
  );
};

export default AllResults;
