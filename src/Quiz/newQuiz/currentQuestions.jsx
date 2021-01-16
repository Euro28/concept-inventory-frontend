import React from "react";

import { ListGroup, Button } from "react-bootstrap";

const CurrentQuestions = (props) => {
  return (
    <div>
      <ListGroup>
        {props.questions &&
          props.questions
            .filter(
              (ques) => ques.type === "checkbox" || ques.type === "radiogroup"
            )
            .map((ques) => (
              <ListGroup.Item key={ques.title}>
                <div style={{ "maxWidth": "700px" }}>{ques.title}</div>
                <Button
                  style={{ float: "right" }}
                  variant="danger"
                  onClick={() => props.removeQuestion(ques.title)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
      </ListGroup>
    </div>
  );
};

export default CurrentQuestions;
