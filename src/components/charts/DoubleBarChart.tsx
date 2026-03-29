import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DoubleBarChart = ({ data }: { data: any }) => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart data={data}>
        <Bar dataKey={"membership"} />
        <Bar dataKey={"session"} />
        <Tooltip />
        <Legend />
        <XAxis dataKey={"day"} />
        <YAxis />
        <CartesianGrid strokeDasharray={"3 3"} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DoubleBarChart;
