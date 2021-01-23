import React, { useState, useEffect } from "react";
import {
  BUTTON,
  MYFORM,
  CONTAINER,
  QuestionInput,
  NewConcept,
} from "./newQuestionComponents.js";
import Alert from "react-bootstrap/Alert";
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

  const addAnswer = (ans) => {
    setNewAnswer(false);

    const ansCopy = [...answers];
    ansCopy.push(ans);

    setAnswers(ansCopy);
  };

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const quizQuestions = await axios.get("/api/questions");
        const questions = quizQuestions.data[0].pages[0].elements;
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
        quizTitle: "Propositional Logic",
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

  const addQuestion = async (question) => {
    const questionsCopy = [...questions];
    questionsCopy.push(question);
    setQuestions(questionsCopy);

    try {
      await axios.patch("/api/questions", {
        question,
        title: "Propositional Logic",
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
      <CONTAINER>
        <MYFORM className="mx-auto">
          <QuestionInput
            setTitle={setTitle}
            setMisconception={setMisconception}
            title={title}
            misconception={misconception}
            concepts={concepts}
          />
          <BUTTON
            onClick={() => setNewConcept(!newConcept)}
            disabled={newAnswer}
          >
            Add Concept
          </BUTTON>
          <BUTTON
            onClick={() => setNewAnswer(!newAnswer)}
            style={{ marginLeft: "30px" }}
            disabled={newConcept}
          >
            Add an answer
          </BUTTON>
          {!(newAnswer || newConcept) && (
            <BUTTON
              style={{ marginLeft: "370px" }}
              onClick={() =>
                addQuestion({
                  correctAnswer: answers
                    .filter((ans) => ans.correct)
                    .map((ans) => ans.value),
                  type: "checkbox",
                  name: `question ${questions.length + 100}`,
                  title,
                  valueName: `${misconception}-${Math.floor(
                    Math.random() * Math.floor(10000)
                  )}`,
                  misconception: misconception,
                  choices: answers.map(({ text, value }) => ({ text, value })),
                  isRequired: true,
                })
              }
            >
              Save Question
            </BUTTON>
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
