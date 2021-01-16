import React, { useState, useEffect } from "react";
import { BUTTON, MYFORM, CONTAINER } from "./newQuestionComponents.js";
import { Form } from "react-bootstrap";
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
      const questions = quizQuestions.data[0].pages[0].elements;
      console.log(questions);
      setQuestions(questions);
    };
    getQuiz();
  }, []);

  const removeQuestion = (title) => {
    const newQuestions = questions.filter((ques) => ques.title !== title);
    setQuestions(newQuestions);
  };

  const addQuestion = (question) => {
    const questionsCopy = [...questions];
    questionsCopy.push(question);
    setQuestions(questionsCopy);
    setTitle("");
    setAnswers([]);
  };

  //question needs
  //choices - the object will need value+text fields
  //isRequired - DONE
  //correctAnswer - DONE
  //name - DONE
  //title - DONE
  //type - DONE
  //valueName - this is the misconception

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

          <Form.Group controlId="questionMisconception">
            <Form.Label> Question Misconception: </Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose..."
              onChange={(e) => setMisconception(e.target.value)}
            >
            <option>Choose...</option>
            <option> conjunction </option>
    </Form.Control>
          </Form.Group>
          <BUTTON onClick={() => setNewAnswer(true)} disabled={newAnswer}>
            Add an answer
          </BUTTON>
          {!newAnswer && (
            <BUTTON
              style={{ marginLeft: "560px" }}
              onClick={() =>
                addQuestion({
                  correctAnswer: answers.filter((ans) => ans.correct)[0].value,
                  type: "radiogroup",
                  name: `question ${questions.length + 5}`,
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
