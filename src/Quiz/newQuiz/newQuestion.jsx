import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  MYFORM,
  CONTAINER,
  QuestionInput,
  NewConcept,
} from "./newQuestionComponents.js";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import axios from "axios";

import NewAnswer from "./newAnswer.jsx";
import EnteredAnswers from "./enteredAnswers.jsx";
import CurrentQuestions from "./currentQuestions.jsx";
import Toolbar from "../../Dashboard/dashboardToolbar.jsx";

const NewQuestion = () => {
  const [answers, setAnswers] = useState([]);
  const [title, setTitle] = useState("");
  const [misconception, setMisconception] = useState("");
  const [newConcept, setNewConcept] = useState(false);
  const [concepts, setConcepts] = useState([]);
  const [newAnswer, setNewAnswer] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [explanation, setExplanation] = useState("");

  const location = useLocation();

  const addAnswer = (ans) => {
    setNewAnswer(false);

    const ansCopy = [...answers];
    ansCopy.push(ans);

    setAnswers(ansCopy);
  };

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const questions = location.state.questions.pages[0].elements;
        setQuestions(questions);

        const concepts = await axios.get("/api/concepts");
        setConcepts(concepts.data);
      } catch (err) {
        setError("Could not retrieve quiz information");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    };
    getQuiz();
  }, []);

  const removeQuestion = async (title) => {
    const newQuestions = questions.filter((ques) => ques.title !== title);
    setQuestions(newQuestions);

    try {
      await axios.patch("/api/questions/remove", {
        quizTitle: location.state.questions.title,
        title,
      });
    } catch (err) {
      setError("could not remove question with title : ", title);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    //make request to remove it
  };

  const addQuestion = async () => {
    const question = {
      correctAnswer: answers
        .filter((ans) => ans.correct)
        .map((ans) => ans.value),
      type: "checkbox",
      name: `question ${questions.length} ${Math.floor(
        Math.random() * Math.floor(10000)
      )}`,
      title,
      explanation,
      valueName: `${misconception}-${Math.floor(
        Math.random() * Math.floor(10000)
      )}`,
      misconception,
      choices: answers.map(({ text, value }) => ({ text, value })),
      isRequired: true,
    };

    const questionsCopy = [...questions];
    questionsCopy.push(question);
    setQuestions(questionsCopy);

    try {
      await axios.patch("/api/questions", {
        question: question,
        title: location.state.questions.title,
      });

      setAnswers([]);
      setTitle("");
      setMisconception("Choose...");
      setSuccess("Question");
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError("Could not add question, have you added a misconception?");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const addConcept = async (concept) => {
    setConcepts({ ...concepts, [concept.concept]: concept.explanation });

    try {
      await axios.patch("/api/concepts", { concept });
      setNewConcept(false);
      setSuccess(`Concept '${concept.concept}'`);
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError(
        "Could not add new concept, it already exists, or you have not added an explanation"
      );
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <>
      <Toolbar />
      <h1>{location.state.questions.title}</h1>
      <CONTAINER>
        <MYFORM className="mx-auto">
          <QuestionInput
            setTitle={setTitle}
            setMisconception={setMisconception}
            setExplanation={setExplanation}
            concepts={concepts}
          />
          <Button
            onClick={() => setNewConcept(!newConcept)}
            disabled={newAnswer}
          >
            Add Concept
          </Button>
          <Button
            onClick={() => setNewAnswer(!newAnswer)}
            style={{ marginLeft: "30px" }}
            disabled={newConcept}
          >
            Add an answer
          </Button>
          {!(newAnswer || newConcept) && (
            <Button
              style={{ marginLeft: "370px" }}
              onClick={() => addQuestion()}
            >
              Save Question
            </Button>
          )}
        </MYFORM>
        {success && (
          <Alert variant="success"> Successfully added {success}</Alert>
        )}
        {error && <Alert variant="danger"> {error} </Alert>}
        {newAnswer && <NewAnswer addAnswer={addAnswer} />}
        {newConcept && <NewConcept addConcept={addConcept} />}
        <EnteredAnswers answers={answers} />
      </CONTAINER>
      <CurrentQuestions questions={questions} removeQuestion={removeQuestion} />
    </>
  );
};

export default NewQuestion;
