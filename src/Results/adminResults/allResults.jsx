import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultsTable from "./resultsTable.jsx";
import Spinner from "../../Quiz/Spinner.jsx";
import Toolbar from "../../Dashboard/dashboardToolbar.jsx";
import markResults from "./markResults.js";

const AllResults = () => {
  const [results, setResults] = useState([]);
  const [concepts, setConcepts] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getALlResults = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/allResults");
        const concept = await axios.get("/api/concepts");
        const questions = await axios.get("/api/questions");

        const result = res.data
          .filter((user) => user.results)
          .map((user) => ({
            results: markResults(user.results, questions),
            name: user.name,
          }));

        setConcepts(concept.data);
        setResults(result);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getALlResults();
  }, []);

  return (
    <>
      <Toolbar />
      {loading ? (
        <Spinner />
      ) : (
        <ResultsTable concepts={concepts} results={results} />
      )}
    </>
  );
};

export default AllResults;
