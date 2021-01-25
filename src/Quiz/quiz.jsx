import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Survey from "survey-react";

const Quiz = () => {
  const [questions, setQuestions] = useState({});

  const history = useHistory();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const questionsAPI = await axios.get("/api/questions");
        setQuestions(questionsAPI.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getQuestions();
  }, []);

  const storeData = async (quizResults) => {
    try {
      const results = await axios.post("/api/results", {
        results: quizResults,
      });
      console.log(quizResults);
      await axios.patch("/api/takenQuiz");

      history.replace("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Survey.Survey
        showCompletedPage={false}
        onComplete={(data) => {
          storeData(data.valuesHash);
        }}
        json={questions}
      />
    </div>
  );
};

export default Quiz;
