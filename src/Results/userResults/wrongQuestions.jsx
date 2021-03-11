import React, { useState } from "react";
import { ListGroup, Badge, Button, Collapse } from "react-bootstrap";

//the format will be
// question title
// options showing which one they chose in red, and the correct answer in green
// then explanation for question
const WrongQuestions = (props) => {
  const [open, setOpen] = useState(false);

  const centered = {
    margin: "auto",
    width: "42%",
    padding: "10px",
  };

  return (
    <div style={centered}>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls={`collapsed-question-${props.wrongAnswer.title}`}
        aria-expanded={open}
        variant="danger"
        style={{ width: 600 }}
      >
        {props.wrongAnswer.title}
      </Button>
      <Collapse in={open}>
        <div
          id={`collapsed-question-${props.wrongAnswer.title}`}
          style={{ width: 600 }}
        >
          <ListGroup>
            {props.wrongAnswer.choices.map((choice) => {
              const correctBadge = props.wrongAnswer.correctAnswer.includes(
                choice.value
              ) && <Badge variant="success">Correct Answer</Badge>;

              const userChoiceBadge = props.wrongAnswer.userAnswer.includes(
                choice.value
              ) && <Badge variant="danger">User Selection</Badge>;

              return (
                <ListGroup.Item key={choice.value}>
                  {choice.text} {correctBadge} {userChoiceBadge}
                </ListGroup.Item>
              );
            })}
            <ListGroup.Item variant="warning">
              {props.wrongAnswer.explanation}
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Collapse>
    </div>
  );
};

export default WrongQuestions;
