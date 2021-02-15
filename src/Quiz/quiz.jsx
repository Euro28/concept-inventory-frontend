import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as Survey from "survey-react";
import Spinner from "./Spinner.jsx";
import _ from "lodash";

const Quiz = () => {
  const [questions, setQuestions] = useState({});
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setLoading(true);
        const userConcepts = await axios.get("/api/userConcepts");
        const questionsArray = location.state.quiz.pages[0].elements;

        let filteredQuestions = [];

        const testedConcepts = userConcepts.data.find(
          (concepts) => concepts.title === location.state.quiz.title
        );

        testedConcepts.concepts.forEach((concept) => {
          const ques = questionsArray.filter(
            (question) => question.misconception === concept
          );

          const sample = _.sampleSize(ques, 3);
          filteredQuestions = filteredQuestions.concat(sample);
        });

        location.state.quiz.pages[0].elements = filteredQuestions;

        setQuestions(location.state.quiz);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getQuestions();
  }, []);

  const storeData = async (quizResults) => {
    try {
      setLoading(true);
      await axios.post("/api/results", {
        results: quizResults,
      });
      await axios.patch("/api/takenQuiz", {
        taken: true,
      });
      setLoading(false);

      history.replace("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Survey.Survey
          showCompletedPage={false}
          onComplete={(data) => {
            storeData(data.valuesHash);
          }}
          json={questions}
        />
      )}
    </div>
  );
};

export default Quiz;
