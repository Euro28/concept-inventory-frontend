import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Results = () => {
  const [quizResults, setQuizResults] = useState({});
  const [loading, setLoading] = useState(false);

  const param = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const results = await axios.get("/api/results");
        setQuizResults(results.data); //im gonna pass this results to some other component which renders it prettier
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchResults();
  }, [param.id]);

  return (
    <>
      {loading ? (
        <div> Loading... (spinner goes here) </div>
      ) : (
        JSON.stringify(quizResults)
      )}
    </>
  );
};

export default Results;
