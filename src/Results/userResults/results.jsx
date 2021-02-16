import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useLocation } from "react-router-dom";

import Spinner from "../../Quiz/Spinner.jsx";
import ConceptResult from "./ConceptResult.jsx";
import Toolbar from "../../Dashboard/dashboardToolbar.jsx";
import markResults from "../adminResults/markResults.js";
import WrongQuestions from "./wrongQuestions.jsx";

const Results = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conceptsExplanations, setConceptExplanations] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [markedConcepts, setMarkedConcepts] = useState([]);

  const location = useLocation();

  const trimResults = ({ choices, explanation, title, correctAnswer }) => ({
    choices,
    explanation,
    title,
    correctAnswer,
  });

  const correctAns = (correctAnswer, given) => {
    return _.isEqual(correctAnswer.sort(), given.sort());
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        console.log("location.state", location.state);

        const allConcepts = await axios.get("/api/concepts");

        //object.keys(result = location.state.userAnswers.quizResults
        const wrong = Object.keys(location.state.userAnswers.quizResults)
          .map((answer) => {
            let question = location.state.quizQuestions.find(
              (question) => question.valueName === answer
            );
            question = trimResults(question);
            question.userAnswer =
              location.state.userAnswers.quizResults[answer];

            return question;
          })
          .filter(
            (question) =>
              !correctAns(question.correctAnswer, question.userAnswer)
          );

        console.log("wrong");
        console.log(wrong);

        setMarkedConcepts(location.state.markedResults);
        setWrongAnswers(wrong);
        //setQuizResults(markedResults);
        setConceptExplanations(allConcepts.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchResults();
  }, []);

  const results = (
    <div>
      {Object.keys(markedConcepts).map((concept) => (
        <ConceptResult
          key={concept}
          title={concept}
          score={markedConcepts[concept]}
          explanation={conceptsExplanations[concept]}
        />
      ))}
    </div>
  );

  const questionFeedback = (
    <div>
      {wrongAnswers.map((answer) => (
        <WrongQuestions key={answer.valueName} wrongAnswer={answer} />
      ))}
    </div>
  );

  return (
    <>
      <Toolbar />
      {loading ? <Spinner /> : results}
      <h1>Questions you got wrong</h1>
      {!loading && questionFeedback}
    </>
  );
};

export default Results;
