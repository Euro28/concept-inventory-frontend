import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

//the format will be
// question title
// options showing which one they chose in red, and the correct answer in green
// then explanation for question
const wrongQuestions = (props) => {
  const padding = {
    paddingTop: "50px",
  };

  return (
    <div style={padding}>
      <ListGroup>
        <ListGroup.Item variant="primary">
          {props.wrongAnswer.title}
        </ListGroup.Item>
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
  );
};

export default wrongQuestions;
