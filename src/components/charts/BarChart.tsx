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
import CustomLegend from "./util/CustomLegend";

const COLORS = ["#d5fb2b", "#2ffb2b", "#2b77fb", "#8f2bfb", "#fb542b"];

const MyBarChart = ({
  data,
  barDataKeys,
  xAxisNameKey,
}: {
  data: any;
  barDataKeys: string[];
  xAxisNameKey: string;
}) => {
  return (
    <ResponsiveContainer height={"100%"} width={"100%"}>
      <BarChart data={data} barSize={15} reverseStackOrder={true} responsive>
        {barDataKeys.map((barDataKey, index) => (
          <Bar
            key={index}
            dataKey={barDataKey}
            stackId={1}
            fill={COLORS[index]}
            activeBar={false}
          />
        ))}

        <XAxis
          dataKey={xAxisNameKey}
          tick={{ className: "text-[0.7rem] lg:text-sm" }}
        />
        <YAxis tick={{ className: "text-[0.7rem] lg:text-sm" }} />
        <CartesianGrid strokeDasharray={"3 3"} />
        <Tooltip content={CustomTooltip} cursor={false} />
        <Legend formatter={CustomLegend} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;
