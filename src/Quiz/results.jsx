import axios from "axios";
import array from "lodash/array";
import React, { useEffect, useState } from "react";

import Spinner from "./Spinner.jsx";
import ConceptResult from "./ConceptResult.jsx";

const Results = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sameArr = (correct, given) => {
    const diff = array.intersection(correct, given);
    return diff.length === correct.length && correct.length === given.length;
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const results = await axios.get("/api/results");
        const questions = await axios.get("/api/questions");

        const correct = questions.data[0].pages[0].elements.map((question) => ({
          misconception: question.misconception,
          correct: sameArr(question.correctAnswer, results[question.valueName]),
        }));

        const concepts = array.uniq(correct.map((ques) => ques.misconception));
        const count = {};

        concepts.forEach(
          (concept) => (count[concept] = { total: 0, correct: 0 })
        );

        correct.forEach((ans) => {
          count[ans.misconception].total++;
          if (ans.correct) count[ans.misconception].correct++;
        });

        console.log(count);
        setQuizResults(count);
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
        />
      ))}
    </div>
  );

  return <>{loading ? <Spinner /> : results}</>;
};

export default Results;
