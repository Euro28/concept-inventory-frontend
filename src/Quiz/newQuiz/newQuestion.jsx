import React, { useState, useEffect } from "react";
import { BUTTON, MYFORM, CONTAINER } from "./newQuestionComponents.js";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import NewAnswer from "./newAnswer.jsx";
import EnteredAnswers from "./enteredAnswers.jsx";
import CurrentQuestions from "./currentQuestions.jsx";
//the form you have two initial fields,
//first is the question name
//the second is a button which says add a new answer
//
//when you click the button that says add a new answer
//the answer form with 3 fields shows up, when you click submit answer
//it submits answer to answers variable and sets form answer form to not visible again
//
//if the user types in misconception field the correct checkbox should be disabled
//if the user ticks the correct checkbox the misconception field should be cleared and
//disabled

const NewQuestion = () => {
  const [answers, setAnswers] = useState([]);
  const [title, setTitle] = useState("");
  const [newAnswer, setNewAnswer] = useState(false);
  const [questions, setQuestions] = useState(null);

  const addAnswer = (ans) => {
    setNewAnswer(false);

    const ansCopy = [...answers];
    ansCopy.push(ans);

    setAnswers(ansCopy);
  };

  useEffect(() => {
    const getQuiz = async () => {
      const quizQuestions = await axios.get("/api/questions");
      const questions = quizQuestions.data.pages[0].elements;
      setQuestions(questions);
    };
    getQuiz();
  }, []);

  const removeQuestion = (name) => {
    const newQuestions = questions.filter((ques) => ques.name !== name);
    setQuestions(newQuestions);
  };

  const addQuestion = (question) => {
    const questionsCopy = [...questions];
    questionsCopy.push(question);
    setQuestions(questionsCopy);
    setTitle("");
    setAnswers([]);
  };

  return (
    <>
      <CONTAINER>
        <MYFORM className="mx-auto">
          <Form.Group controlId="questionName">
            <Form.Label> Question: </Form.Label>
            <Form.Control
              type="text"
              name="question"
              placeholder="Question..."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>
          <BUTTON onClick={() => setNewAnswer(true)} disabled={newAnswer}>
            Add an answer
          </BUTTON>
          {!newAnswer && (
            <BUTTON
              style={{ marginLeft: "560px" }}
              onClick={() =>
                addQuestion({
                  type: "radiogroup",
                  name: "test name",
                  title,
                  choices: answers,
                  isRequired: true,
                })
              }
            >
              Save Changes
            </BUTTON>
          )}
        </MYFORM>
        {newAnswer && <NewAnswer addAnswer={addAnswer} />}
        <EnteredAnswers answers={answers} />
      </CONTAINER>
      <CurrentQuestions questions={questions} removeQuestion={removeQuestion} />
    </>
  );
};

export default NewQuestion;
