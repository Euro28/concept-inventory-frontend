import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../Quiz/Spinner.jsx";
import Toolbar from "../../Dashboard/dashboardToolbar.jsx";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import markResults from "../adminResults/markResults.js";
import { useLocation } from "react-router-dom";
import { RadChart, getRadarResults } from "./RadarChart.js";
import { ConceptLineChart, getLineChartResults } from "./LineChart.js";
import UserResultsTable from "./UserResultsTable.js";

const UserResultsDashboard = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [radarResults, setRadarResults] = useState([]);
  const [lineResults, setLineResults] = useState([]);
  const [markedResults, setMarkedResults] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const getResults = async () => {
      try {
        const questions = await axios.get("/api/questions");
        const results = location.state.results;

        const quizQuestions = questions.data.find(
          (quiz) => quiz.title === location.state.quizTitle
        );

        const markedResults = results.map((result) =>
          markResults(result.quizResults, quizQuestions)
        );

        setLineResults(getLineChartResults(markedResults));
        setMarkedResults(markedResults);
        setQuizQuestions(quizQuestions.pages[0].elements);
        setResults(results);
        setRadarResults(getRadarResults(markedResults));
        setLoading(false);
      } catch (err) {
        setError("Could not retrieve user results please contact Euro ");
        setLoading(false);
      }
    };

    getResults();
  }, []);

  return (
    <div>
      <Toolbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div style={{ margin: "auto", width: "50%" }}>
            <h1>Results for {location.state.quizTitle}</h1>
          </div>
          <UserResultsTable
            markedResults={markedResults}
            results={results}
            questions={quizQuestions}
          />
          <div style={{ display: "flex" }}>
            <div>
              <RadChart results={radarResults} />
            </div>
            <div>
              <ConceptLineChart data={lineResults} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserResultsDashboard;
