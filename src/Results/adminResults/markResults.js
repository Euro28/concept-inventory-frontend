import array from "lodash/array";

const correctAns = ({ correctAnswer }, given) => {
  const diff = array.intersection(correctAnswer, given);
  return (
    diff.length === correctAnswer.length &&
    correctAnswer.length === given.length
  );
};

const markResults = (results, questions) => {
  const mark = Object.keys(results).map((questionName) => {
    const correctAnswer = questions.pages[0].elements.find(
      (question) => question.valueName === questionName
    );

    return {
      misconception: questionName.split("-")[0],
      correct: correctAns(correctAnswer, results[questionName]),
    };
  });

  const concepts = array.uniq(mark.map((ques) => ques.misconception));
  const count = {};

  concepts.forEach(
    (concept) =>
      (count[concept] = {
        total: 0,
        correct: 0,
      })
  );

  mark.forEach((ans) => {
    count[ans.misconception].total++;
    if (ans.correct) count[ans.misconception].correct++;
  });

  return count;
};

export default markResults;
