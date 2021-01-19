import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Survey from "survey-react";

import Results from "./results.jsx";

const Quiz = (props) => {
  const [resultPage, setResultPage] = useState(false);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState({});

  const history = useHistory();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const questionsAPI = await axios.get("/api/questions");
        setQuestions(questionsAPI.data[0]);
      } catch (err) {
        setError("couldnt retrieve questions please contact euro");
      }
    };

    getQuestions();
  }, []);

  const storeData = async (quizResults) => {
    try {
      history.replace("/dashboard");
      const results = await axios.post("/api/results", {
        results: quizResults,
      });

      await axios.patch("/api/takenQuiz");

    } catch (err) {
      setError(
        "couldn't post results of quiz, could you please take it again sorry :("
      );
    }
  };

  return (
    <div>
      <Survey.Survey
        showCompletedPage={false}
        onComplete={(data) => {
          storeData(data.valuesHash);
          setResultPage(true);
        }}
        json={questions}
      />
    </div>
  );
};

export default Quiz;
