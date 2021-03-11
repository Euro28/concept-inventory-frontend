import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import _ from "lodash";

const colorArray = [
  "#FF6633",
  "#FF33FF",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

const ConceptLineChart = (props) => {
  const concepts = _.uniq(
    props.data.reduce((acc, cur) => acc.concat(Object.keys(cur)), [])
  );

  const index = concepts.indexOf("attempt");

  if (index > -1) {
    concepts.splice(index, 1);
  }

  return (
    <LineChart
      width={730}
      height={250}
      data={props.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="attempt" />
      <YAxis />
      <Tooltip />
      <Legend />
      {concepts.map((concept, idx) => (
        <Line
          key={concept}
          type="monotone"
          dataKey={concept}
          stroke={colorArray[idx]}
        />
      ))}
    </LineChart>
  );
};

const getLineChartResults = (results) => {
  const lineResults = results.map((result, idx) => {
    const lineResult = {};
    lineResult.attempt = idx;

    Object.keys(result).forEach((concept) => {
      lineResult[concept] = (
        (result[concept].correct / result[concept].total) *
        100
      ).toFixed(0);
    });
    return lineResult;
  });

  return lineResults;
};

export { ConceptLineChart, getLineChartResults };
