import React from "react";

import { ListGroup } from "react-bootstrap";

const enteredAnswers = (props) => {
  return (
    <>
      <ListGroup>
        {props.answers.map((answer) => (
          <ListGroup.Item
            key={answer.text}
            variant={answer.correct ? "success" : "danger"}
          >
            {answer.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default enteredAnswers;
