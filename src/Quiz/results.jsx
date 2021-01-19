import axios from "axios";
import array from "lodash/array";
import React, { useEffect, useState } from "react";

import Spinner from "./Spinner.jsx";
import ConceptResult from "./ConceptResult.jsx";

const Results = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conceptsExplanations, setConceptExplanations] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        const results = await axios.get("/api/results");
        const allConcepts = await axios.get("/api/concepts");

        setConceptExplanations(allConcepts.data);
        setQuizResults(results);

        setLoading(false);
      } catch (err) {
        setError(err);
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

  return <>{loading ? <Spinner /> : results}</>;
};

export default Results;
