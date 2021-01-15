import React, { useState } from "react";
import { BUTTON, MYFORM, CONTAINER } from "./newQuestionComponents.js";
import { Form, Button } from "react-bootstrap";

//the form for adding a new answer should have 3 fields
//the first field is display answer
//the second field should be a dropdown of concepts, if the concepts
//they are looking for is not found they should be able to add a custom one that is saved
//the third field is a checkbox stating the answer is correct

const NewAnswer = (props) => {
  const [title, setTitle] = useState("");
  const [misconception, setMisconception] = useState("");
  const [correct, setCorrect] = useState(false);

  return (
    <CONTAINER>
      <MYFORM
        className="mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          props.addAnswer({ text: title, value: misconception, correct });
        }}
      >
        <Form.Group controlId="answerTitle">
          <Form.Label> Answer :</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="answer"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="answerConcepts">
          <Form.Label> Misconception: </Form.Label>
          <Form.Control
            as="select"
            defaultValue="Choose..."
            onChange={(e) => setMisconception(e.target.value)}
          >
            <option>Choose...</option>
            <option>Conjunction</option>
          </Form.Control>
        </Form.Group>
        <Form.Group id="correctCheckbox">
          <Form.Check
            type="checkbox"
            label="Correct Answer?"
            onChange={(e) => setCorrect(e.target.checked)}
          />
        </Form.Group>
        <BUTTON type="submit"> Submit </BUTTON>
      </MYFORM>
    </CONTAINER>
  );
};

export default NewAnswer;
