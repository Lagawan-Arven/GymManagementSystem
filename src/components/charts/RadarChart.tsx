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
import CustomLegend from "./util/CustomLegend";

const MyRadarChart = ({
  data,
  dataKey = "value",
  nameKey = "name",
  outerRadius = 70,
}) => {
  return (
    <ResponsiveContainer height={"100%"} width={"100%"}>
      <RadarChart data={data} outerRadius={outerRadius} responsive>
        <Radar
          dataKey={dataKey}
          stroke="#00C49F"
          fill="#17d5ff"
          fillOpacity={0.6}
          legendType="circle"
        />
        <PolarGrid stroke="#848a8b" />
        <PolarAngleAxis
          dataKey={nameKey}
          tick={{ className: "text-xs md:text-sm" }}
        />
        <PolarRadiusAxis tick={{ className: "text-xs md:text-sm" }} />
        <Tooltip content={CustomTooltip} />
        <Legend formatter={CustomLegend} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default MyRadarChart;
