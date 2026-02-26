import { PieChart, Pie, ResponsiveContainer, Legend } from "recharts";

const bmiData = [
  { name: "Severe Thinness", value: 1, fill: "#301cd6" },
  { name: "Moderate Thinness", value: 1, fill: "#3b6cf1" },
  { name: "Mild Thinness", value: 1.5, fill: "#3b99f1" },
  { name: "Normal", value: 6.5, fill: "#2ad13a" },
  { name: "Overweight", value: 5, fill: "#b7d12a" },
  { name: "Obese Class I", value: 5, fill: "#d17b2a" },
  { name: "Obese Class II", value: 5, fill: "#d1412a" },
  { name: "Obese Class III", value: 1, fill: "#bf0707" },
];

const renderNeedle = (bmi: number) => {
  const min = 15;
  const max = 41;

  // Clamp BMI
  const clamped = Math.max(min, Math.min(bmi, max));

  // Convert BMI to angle (180 -> 0)
  const angle = 180 - ((clamped - min) / (max - min)) * 180;

  const radius = 40; // needle length
  const rad = (angle * Math.PI) / 180;

  // Calculate needle endpoint
  const x = radius * Math.cos(rad);
  const y = -radius * Math.sin(rad);

  return (
    <>
      <g>
        <circle cx="50%" cy="65%" r={8} fill="#666" />
        <svg viewBox="0 0 100 100">
          <path d={`M 50 65 l ${x} ${y}`} stroke="black" strokeWidth={1} />
        </svg>
      </g>
    </>
  );
};

export default function BMIChart({ bmi }: { bmi: number }) {
  return (
    <ResponsiveContainer height={"100%"} width={"100%"}>
      <PieChart className="relative" responsive>
        <Pie
          data={bmiData}
          dataKey="value"
          startAngle={180}
          endAngle={0}
          cx="50%"
          cy="90%"
          innerRadius={50}
          outerRadius={110}
          legendType="square"
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="left"
          iconSize={7}
          itemSorter={null}
          wrapperStyle={{
            fontSize: "12px",
            paddingBottom: "5px",
            paddingLeft: "5px",
            position: "absolute",
            color: "white",
          }}
        />
        {renderNeedle(bmi)}
      </PieChart>
    </ResponsiveContainer>
  );
}
