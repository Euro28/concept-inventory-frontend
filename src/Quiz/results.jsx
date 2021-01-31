import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";

import Spinner from "./Spinner.jsx";
import ConceptResult from "./ConceptResult.jsx";
import Toolbar from "../Dashboard/dashboardToolbar.jsx";
import markResults from "../Results/markResults.js";
import WrongQuestions from "./wrongQuestions.jsx";

const Results = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conceptsExplanations, setConceptExplanations] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const trimResults = ({ choices, explanation, title, correctAnswer }) => ({
    choices,
    explanation,
    title,
    correctAnswer,
  });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        const results = await axios.get("/api/results");
        const allConcepts = await axios.get("/api/concepts");
        const questions = await axios.get("/api/questions");
        const markedResults = markResults(results.data, questions);

        const wrong = Object.keys(results.data)
          .map((answer) => {
            let question = questions.data[0].pages[0].elements.find(
              (question) => question.valueName === answer
            );
            question = trimResults(question);
            question.userAnswer = results.data[answer];

            return question;
          })
          .filter((question) => 
            (
              _.difference(question.userAnswer, question.correctAnswer)
                .length !== 0
            )
          );

        console.log("WRONG");
        console.log(wrong);

        setWrongAnswers(wrong);
        setQuizResults(markedResults);
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
