import { type TooltipContentProps } from "recharts";

const RadarCustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<any, any>) => {
  const isVisible = active && payload && payload.length;
  return (
    <div
      className="backdrop-blur-md rounded-xl lg:p-2 lg:text-xs"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <>
          <p>{`${payload[0].value} Workouts`}</p>
          <p>{`with Coach ${label}`}</p>
        </>
      )}
    </div>
  );
};

export default RadarCustomTooltip;
