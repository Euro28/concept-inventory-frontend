import React from "react";
import Modal from "react-bootstrap/Modal";

const ConceptResult = (props) => {
  //Results should be props.score.totl but gonna hard code to 3
  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title> {props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Results: {props.score.correct} / {props.score.total}
        </p>
      </Modal.Body>
    </Modal.Dialog>
  );
};

export default ConceptResult;
