import array from "lodash/array";
import axios from "axios";

const correctAns = (correct, given) => {
  const diff = array.intersection(correct, given);
  return diff.length === correct.length && correct.length === given.length;
};

const markResults = (results, questions) => {
  const correct = questions.data[0].pages[0].elements.map((question) => ({
    misconception: question.misconception,
    correct: correctAns(question.correctAnswer, results[question.valueName]),
  }));

  const concepts = array.uniq(correct.map((ques) => ques.misconception));
  const count = {};

  concepts.forEach(
    (concept) =>
      (count[concept] = {
        total: 0,
        correct: 0,
      })
  );

  correct.forEach((ans) => {
    count[ans.misconception].total++;
    if (ans.correct) count[ans.misconception].correct++;
  });

  return count;
};

export default markResults;
