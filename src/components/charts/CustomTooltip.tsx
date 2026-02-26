import { type TooltipContentProps } from "recharts";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<any, any>) => {
  const isVisible = active && payload && payload.length;
  return (
    <div
      className="backdrop-blur-md rounded-xl lg:p-2 lg:text-md"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <>
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index}>
              <strong>{entry.dataKey}:</strong> {entry.value}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default CustomTooltip;
