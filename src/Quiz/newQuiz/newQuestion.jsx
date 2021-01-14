import React, { useState, useEffect } from "react";
import { BUTTON, MYFORM, CONTAINER } from "./newQuestionComponents.js";
import { Form, Button } from "react-bootstrap";

import NewAnswer from "./newAnswer.jsx";
//the form you have two initial fields,
//first is the question name
//the second is a button which says add a new answer
//
//when you click the button that says add a new answer
//the answer form with 3 fields shows up, when you click submit answer
//it submits answer to answers variable and sets form answer form to not visible again
//
//the form for adding a new answer should have 3 fields
//the first field is display answer
//the second field should be a dropdown of concepts, if the concepts
//they are looking for is not found they should be able to add a custom one that is saved
//the third field is a checkbox stating the answer is correct
//
//if the user types in misconception field the correct checkbox should be disabled
//if the user ticks the correct checkbox the misconception field should be cleared and
//disabled
//
//after submitting the question, there should be at a minimum two answers
//and at least one answer must be marked correct

//each answer prinnted should also have a remove and edit button
//remove button is simple remove from object
//edit will open newAnswer with passed in current props, and delete current entry.
//
const NewQuestion = () => {
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState(false);

  const addAnswer = (ans) => {
    setNewAnswer(false);

    const ansCopy = [...answers];
    ansCopy.push(ans);

    setAnswers(ansCopy);
  };

  useEffect(() => {
    const getQuiz = async () => {
      const quizQuestions = await axios.get("/api/questions");
      const questions = quizQuestions.data

      console.log(questions)
  }
    getQuiz()}
      , []);

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
            />
          </Form.Group>
          <BUTTON onClick={() => setNewAnswer(true)} disabled={newAnswer}>
            Add an answer
          </BUTTON>
          {!newAnswer && (
            <BUTTON
              style={{ "marginLeft": "560px" }}
              onClick={() => console.log("patch / post new question data")}
            >
              Save Changes
            </BUTTON>
          )}
        </MYFORM>
        {newAnswer && <NewAnswer addAnswer={addAnswer} />}
      </CONTAINER>
      {answers.map((answer) => (
        <li key={answer.title}>
          {answer.title} {answer.misconception} {String(answer.correct)}
        </li>
      ))}
    </>
  );
};

export default NewQuestion;
