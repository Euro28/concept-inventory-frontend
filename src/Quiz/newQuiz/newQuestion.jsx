import React, { useState, useEffect } from "react";
import {
  BUTTON,
  MYFORM,
  CONTAINER,
  QuestionInput,
  NewConcept,
} from "./newQuestionComponents.js";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";

import NewAnswer from "./newAnswer.jsx";
import EnteredAnswers from "./enteredAnswers.jsx";
import CurrentQuestions from "./currentQuestions.jsx";
//the form you have two initial fields,
//first is the question name
//the second is a button which says add a new answer
//
//if the user types in misconception field the correct checkbox should be disabled
//if the user ticks the correct checkbox the misconception field should be cleared and
//disabled

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

  const removeQuestion = (title) => {
    const newQuestions = questions.filter((ques) => ques.title !== title);
    setQuestions(newQuestions);
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
    const conceptsCopy = [...concepts];
    conceptsCopy.push(concept);
    setConcepts(conceptsCopy);
    try {
      const newConcepts = await axios.patch("/api/concepts", { concept });
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
              style={{ marginLeft: "30px" }}
              onClick={() =>
                addQuestion({
                  correctAnswer: answers
                    .filter((ans) => ans.correct)
                    .map((ans) => ans.value),
                  type: "checkbox",
                  name: `question ${questions.length + 5}`,
                  title,
                  valueName: misconception,
                  choices: answers.map(({ text, value }) => ({ text, value })),
                  isRequired: true,
                })
              }
            >
              Save Question
            </BUTTON>
          )}
          <Button
            onClick={() => console.log("patching quiz")}
            style={{ marginLeft: "225px" }}
            variant="success"
          >
            Apply Changes
          </Button>
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
