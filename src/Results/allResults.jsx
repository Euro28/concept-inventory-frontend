import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultsTable from "./resultsTable.jsx";
import Spinner from "../Quiz/Spinner.jsx";
import Toolbar from "../Dashboard/dashboardToolbar.jsx";

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
        setResults(res.data);
        setConcepts(concept.data);
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
