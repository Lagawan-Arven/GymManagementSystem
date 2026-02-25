import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import CustomTooltip from "./CustomTooltip";

const MyRadarChart = () => {
  const pieChartData = [
    { coach: "Wilson", workouts: 10, fill: "#0088FE" },
    { coach: "Justin", workouts: 15, fill: "#00C49F" },
    { coach: "Klyd", workouts: 20, fill: "#FFBB28" },
    { coach: "James", workouts: 10, fill: "#FF8042" },
    { coach: "Edward", workouts: 15, fill: "#8884d8" },
  ];
  return (
    <ResponsiveContainer height={"100%"} width={"100%"}>
      <RadarChart data={pieChartData} outerRadius={70} responsive>
        <Radar
          dataKey={"workouts"}
          stroke="#00C49F"
          fill="#17d5ff"
          fillOpacity={0.6}
          legendType="circle"
        />
        <PolarGrid stroke="#848a8b" />
        <PolarAngleAxis dataKey={"coach"} fontSize={12} />
        <PolarRadiusAxis fontSize={10} />
        <Tooltip content={CustomTooltip} />
        <Legend wrapperStyle={{ fontSize: "12px" }} iconSize={9} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default MyRadarChart;
