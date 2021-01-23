import axios from "axios";
import React, { useEffect, useState } from "react";

import Spinner from "./Spinner.jsx";
import ConceptResult from "./ConceptResult.jsx";
import Toolbar from "../Dashboard/dashboardToolbar.jsx";

const Results = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conceptsExplanations, setConceptExplanations] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        const results = await axios.get("/api/results");
        const allConcepts = await axios.get("/api/concepts");

        setConceptExplanations(allConcepts.data);
        setQuizResults(results.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchResults();
  }, []);

  const results = (
    <div>
      {Object.keys(quizResults).map((concept) => (
        <ConceptResult
          key={concept}
          title={concept}
          score={quizResults[concept]}
          explanation={conceptsExplanations[concept]}
        />
      ))}
    </div>
  );

  return (
    <>
      <Toolbar />
      {loading ? <Spinner /> : results}
    </>
  );
};

export default Results;
