import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";

const CONTAINER = styled.div`
  background: #f7f9fa;
  height: auto;
  width: 90%;
  margin: 5em auto;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);

  label {
    color: #24b9b6;
    font-size: 1.2em;
    font-weight: 400;
  }
`;

const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;

  @media (min-width: 786px) {
    width: 50%;
  }
`;

const BUTTON = styled(Button)`
  background: #1863ab;
  border: none;
  font-size: 1.2em;
  font-weight: 400;

  &:hover {
    background: #1d3461;
  }
`;

const QuestionInput = (props) => {
  return (
    <>
      <Form.Group controlId="questionName">
        <Form.Label> Question: </Form.Label>
        <Form.Control
          type="text"
          name="question"
          placeholder="Question..."
          onChange={(e) => props.setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="questionMisconception">
        <Form.Label> Question Misconception: </Form.Label>
        <Form.Control
          as="select"
          defaultValue="Choose..."
          onChange={(e) => props.setMisconception(e.target.value)}
        >
          <option>Choose...</option>
          {props.concepts.map((concpt) => (
            <option key={concpt.concept}> {concpt.concept} </option>
          ))}
        </Form.Control>
      </Form.Group>
    </>
  );
};

const NewConcept = (props) => {
  const [concept, setConcept] = useState("");
  const [explanation, setExplanation] = useState("");

  return (
    <CONTAINER>
      <MYFORM
        className="mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          setConcept("");
          setExplanation("");
          props.addConcept({ concept, explanation });
        }}
      >
        <Form.Group controlId="concept">
          <Form.Label> Concept :</Form.Label>
          <Form.Control
            type="text"
            name="conceptField"
            placeholder="concept"
            onChange={(e) => setConcept(e.target.value)}
            value={concept}
          />
        </Form.Group>
        <Form.Group controlId="explanation">
          <Form.Label> Explanation :</Form.Label>
          <Form.Control
            type="text"
            name="explanationField"
            placeholder="explanation"
            onChange={(e) => setExplanation(e.target.value)}
            value={explanation}
          />
        </Form.Group>
        <BUTTON type="submit"> Submit </BUTTON>
      </MYFORM>
    </CONTAINER>
  );
};

export { MYFORM, BUTTON, CONTAINER, QuestionInput, NewConcept };
