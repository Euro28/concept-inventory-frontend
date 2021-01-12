import axios from "axios";
import React, { useState } from "react";
import * as Survey from "survey-react";
import JSON from "./questions.js";

const Quiz = (props) => {
  // const [quiz, setQuiz] = useState({})
  const [resultPage, setResultPage] = useState(false);
  const [error, setError] = useState("");

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
        <div >
          <Survey.Survey
            showCompletedPage={false}
            onComplete={(data) => {
              storeData(data.valuesHash);
              setResultPage(true);
            }}
            json={JSON}
          />
        </div>
      )}
    </>
  );
};

export default Quiz;
