import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import CustomTooltip from "./CustomTooltip";

const MyBarChart = ({ data, barDataKey = "value", xAxisDataKey = "name" }) => {
  return (
    <ResponsiveContainer height={"100%"} width={"100%"} style={{}}>
      <BarChart
        data={data}
        barSize={15}
        style={{ position: "relative" }}
        responsive
      >
        <Bar dataKey={barDataKey} fill="#0088FE" activeBar={false} />
        <XAxis dataKey={xAxisDataKey} fontSize={12} />
        <Tooltip content={CustomTooltip} cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;
