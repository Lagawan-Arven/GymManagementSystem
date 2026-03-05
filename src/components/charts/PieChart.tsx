import {
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
  Legend,
  type PieLabelRenderProps,
} from "recharts";

import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./util/CustomLegend";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#000000"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};
const MyPieChart = ({ data, pieDataKey = "value", pieNameKey = "program" }) => {
  return (
    <ResponsiveContainer height={"100%"} width={"100%"}>
      <PieChart data={data}>
        <Pie
          dataKey={pieDataKey}
          nameKey={pieNameKey}
          cx={"50%"}
          cy={"50%"}
          outerRadius={"80%"}
          labelLine={false}
          legendType="circle"
          zIndex={0}
          label={renderCustomizedLabel}
        />
        <Tooltip content={CustomTooltip} />
        <Legend formatter={CustomLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MyPieChart;
