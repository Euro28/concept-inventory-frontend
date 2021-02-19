import {
  RadarChart,
  PolarGrid,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const RadChart = (props) => (
  <RadarChart outradius={90} width={730} height={250} data={props.results}>
    <PolarGrid />
    <PolarAngleAxis dataKey="concept" />
    <PolarRadiusAxis angle={30} domain={[0, 100]} />
    <Radar
      name="score"
      dataKey="score"
      stroke="#82ca9d"
      fill="#82ca9d"
      fillOpacity={0.6}
    />
  </RadarChart>
);

const getRadarResults = (results) => {
  let formattedResultsForRadar = [];

  results.forEach((result) => {
    Object.keys(result).forEach((concept) => {
      const conceptScore = formattedResultsForRadar.filter(
        (score) => score.concept === concept
      );

      //no score for concept
      if (conceptScore.length === 0) {
        formattedResultsForRadar.push({
          concept: concept,
          correct: Number(result[concept].correct),
          total: result[concept].total,
        });
      } else {
        conceptScore[0].correct += result[concept].correct;
        conceptScore[0].total += result[concept].total;
      }
    });
  });

  formattedResultsForRadar = formattedResultsForRadar.map((result) => ({
    concept: result.concept,
    score: ((result.correct / result.total) * 100).toFixed(0),
    fullMark: 100,
  }));

  return formattedResultsForRadar;
};

export { RadChart, getRadarResults };
