import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Survey from "survey-react";

const Quiz = (props) => {
  // const [quiz, setQuiz] = useState({})
  const [resultPage, setResultPage] = useState(false);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const questionsAPI = await axios.get("/api/questions");
        console.log("the questionsAPi is ", questionsAPI);
        setQuestions(questionsAPI.data);
      } catch (err) {
        setError("couldnt retrieve questions please contact euro");
      }
    };

    getQuestions();
  }, []);
  const storeData = async (quizResults) => {
    try {
      await axios.post("/api/results", {
        results: quizResults,
      });
      await axios.patch("/api/takenQuiz");
    } catch (err) {
      setError(
        "couldn't post results of quiz, could you please take it again sorry :("
      );
    }
  };
  //make this a separate file
  const Results = (data) => (
    <main>
      <h1> Results page </h1>
    </main>
  );

  return (
    <>
      {resultPage ? (
        Results()
      ) : (
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
      )}
    </>
  );
};

export default Quiz;
