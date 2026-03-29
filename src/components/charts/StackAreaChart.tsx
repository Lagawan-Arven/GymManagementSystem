import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import CustomTooltip from "./CustomTooltip";

const StackAreaChart = ({ data }: { data: Array<Record<string, any>> }) => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"} className={""}>
      <AreaChart
        data={data}
        reverseStackOrder={true}
        className="aspect-[1.618]"
      >
        <Area
          dataKey={"session"}
          stackId={1}
          type={"monotone"}
          fill="#22cbc9"
        />
        <Area
          dataKey={"member_session"}
          stackId={1}
          type={"monotone"}
          fill="#8522cb"
        />
        <Area
          dataKey={"single_session"}
          stackId={1}
          type={"monotone"}
          fill="#b29514"
        />

        <Area
          dataKey={"new_member"}
          stackId={1}
          type={"monotone"}
          fill="#17b214"
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={"day"}
          tick={{ className: "text-[0.7rem] lg:text-sm" }}
        />
        <YAxis tick={{ className: "text-[0.7rem] lg:text-sm" }} />

        <Tooltip content={CustomTooltip} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StackAreaChart;
