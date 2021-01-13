import React from "react";
import { BUTTON, MYFORM, CONTAINER } from "./newQuestionComponents.js";
import { Form, Button } from "react-bootstrap";

//the form for adding a new answer should have 3 fields
//the first field is display answer
//the second field should be a dropdown of concepts, if the concepts
//they are looking for is not found they should be able to add a custom one that is saved
//the third field is a checkbox stating the answer is correct

const NewAnswer = () => {
  return (
    <CONTAINER>
      <MYFORM className="mx-auto">
        <Form.Group controlId="answerTitle">
          <Form.Label> Answer :</Form.Label>
          <Form.Control type="text" name="title" placeholder="answer" />
        </Form.Group>
        <Form.Group controlId="answerConcepts">
          <Form.Label> Misconception: </Form.Label>
          <Form.Control as="select" defaultValue="Choose...">
            <option>Choose...</option>
            <option>Conjunction</option>
          </Form.Control>
        </Form.Group>
        <Form.Group id="correctCheckbox">
        <Form.Check type="checkbox" label="Correct Answer?"/>
    </Form.Group>
      </MYFORM>
    </CONTAINER>
  );
};

export default NewAnswer;
