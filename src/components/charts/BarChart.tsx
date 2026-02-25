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

const MyBarChart = ({ data, barDataKey = "value", xAxisDataKey = "name" }) => {
  return (
    <ResponsiveContainer>
      <BarChart data={data} barSize={15}>
        <Bar dataKey={barDataKey} fill="#0088FE" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;
