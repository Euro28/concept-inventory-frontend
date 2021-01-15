import React, { useEffect } from "react";

import { ListGroup, Button } from "react-bootstrap";

const CurrentQuestions = (props) => {
  useEffect(() => {
    if (props.question) {
      console.log(
        props.questions.filter(
          (ques) => ques.type === "checkbox" || ques.type === "radiogroup"
        )
      );
    }
  }, [props.question]);

  return <div></div>;
};

export default CurrentQuestions;
