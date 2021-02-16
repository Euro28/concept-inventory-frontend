import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../Quiz/Spinner.jsx";
import Toolbar from "../../Dashboard/dashboardToolbar.jsx";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  RadarChart,
  PolarGrid,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import markResults from "../adminResults/markResults.js";
import { useLocation } from "react-router-dom";

const UserResultsDashboard = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [radarResults, setRadarResults] = useState([]);
  const [markedResults, setMarkedResults] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);

  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const getResults = async () => {
      try {
        const questions = await axios.get("/api/questions");

        const quizQuestions = questions.data.find(
          (quiz) => quiz.title === location.state.quizTitle
        );

        const markedResults = location.state.results.map((result) =>
          markResults(result.quizResults, quizQuestions)
        );

        setMarkedResults(markedResults);
        setQuizQuestions(quizQuestions.pages[0].elements);
        setResults(location.state.results);

        //let formattedResultsForRadar = [];

        //markedResults.forEach((result) => {
        //Object.keys(result).forEach((concept) => {
        //const conceptScore = formattedResultsForRadar.filter(
        //(obj) => obj.concept === concept
        //);

        //const score = conceptScore[0];

        //if (conceptScore.length === 0) {
        //formattedResultsForRadar.push({
        //concept: concept,
        //correct: Number(result[concept].correct),
        //total: result[concept].total,
        //});
        //} else {
        //score.correct += result[concept].correct;
        //score.total += result[concept].total;
        //}
        //});
        //});

        //formattedResultsForRadar = formattedResultsForRadar.map((result) => ({
        //concept: result.concept,
        //score: ((result.correct / result.total) * 100).toFixed(2),
        //fullMark: 100,
        //}));

        //setRadarResults(formattedResultsForRadar);
      } catch (err) {
        setError("Could not retrieve user results please contact Euro ");
      }
    };

    getResults();
    setLoading(false);
  }, []);

  const allResults = results.map((result, idx) => (
    <div key={JSON.stringify(result)}>
      <Link
        to={{
          pathname: "/userResults",
          state: {
            userAnswers: results[idx],
            markedResults: markedResults[idx],
            quizQuestions,
          },
        }}
      >
        <Button variant="primary">Result- {idx}</Button>
      </Link>
    </div>
  ));

  //const radarchart = (
  //<radarchart outradius={90} width={730} height={250} data={radarresults}>
  //<polargrid />
  //<polarangleaxis datakey="concept" />
  //<polarradiusaxis angle={30} domain={[0, 100]} />
  //<radar
  //datakey="score"
  //stroke="#82ca9d"
  //fill="#82ca9d"
  //fillopacity={0.6}
  ///>
  //</radarchart>
  //);

  return (
    <div>
      <Toolbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Results for {location.state.quizTitle}</h1>
          {allResults}
        </>
      )}
    </div>
  );
};

export default UserResultsDashboard;
