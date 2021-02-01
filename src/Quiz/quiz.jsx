import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Survey from "survey-react";
import Spinner from "./Spinner.jsx";
import _ from "lodash";

const Quiz = () => {
  const [questions, setQuestions] = useState({});
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setLoading(true);
        const questionsAPI = await axios.get("/api/questions");
        const userConcepts = await axios.get("/api/userConcepts");

        const questionsArray = questionsAPI.data[0].pages[0].elements;

        let filteredQuestions = [];
        userConcepts.data.forEach((concept) => {
          const ques = questionsArray.filter(
            (question) => question.misconception === concept
          );
          const sample = _.sampleSize(ques, 3);
          filteredQuestions = filteredQuestions.concat(sample);
        });

        questionsAPI.data[0].pages[0].elements = filteredQuestions;

        setQuestions(questionsAPI.data[0]);
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
