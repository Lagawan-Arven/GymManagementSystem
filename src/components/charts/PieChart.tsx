import { Pie, PieChart, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

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
        />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MyPieChart;
