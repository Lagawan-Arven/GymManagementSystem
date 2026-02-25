import { BarChart, PieChart, RadarChart } from "../../components/charts";

import { MdDashboardCustomize } from "react-icons/md";
import { TbSum } from "react-icons/tb";

const CoachPage = () => {
  const BarChartData = [
    { month: "Jan", students: 31 },
    { month: "Feb", students: 28 },
    { month: "March", students: 26 },
    { month: "April", students: 25 },
    { month: "May", students: 20 },
    { month: "June", students: 21 },
    { month: "July", students: 31 },
    { month: "August", students: 30 },
    { month: "Sept", students: 21 },
    { month: "Oct", students: 27 },
    { month: "Nov", students: 20 },
    { month: "Dec", students: 25 },
  ];

  const PieChartData = [
    { program: "push", students: 31, fill: "#0088FE" },
    { program: "pull", students: 28, fill: "#00C49F" },
    { program: "arms", students: 26, fill: "#FFBB28" },
    { program: "core", students: 25, fill: "#FF8042" },
    { program: "legs", students: 20, fill: "#8884d8" },
  ];
  return (
    <>
      <main className="h-auto lg:h-[80vh] ">
        <div className="grid lg:grid-cols-3 lg:grid-rows-8 lg:gap-x-2 lg:gap-y-2 lg:h-full lg:px-5">
          <section className="flex gap-2 items-center rounded-xl dark:bg-neutral-800 lg:col-span-2 lg:px-2">
            <MdDashboardCustomize />
            <h1 className="font-bold lg:text-2xl">DashBoard</h1>
          </section>

          <section className="rounded-xl dark:bg-neutral-800"></section>

          <section className="flex items-center gap-2 rounded-xl dark:bg-neutral-800 lg:px-2">
            <TbSum />
            <h1>Total Students: </h1>
          </section>

          <section className="rounded-xl dark:bg-neutral-800"></section>

          <section className="rounded-xl dark:bg-neutral-800"></section>

          <section className="rounded-xl dark:bg-neutral-800 lg:row-span-3 lg:col-span-2">
            <BarChart
              data={BarChartData}
              barDataKey="students"
              xAxisDataKey="month"
            />
          </section>

          <section className="rounded-xl dark:bg-neutral-800 lg:row-span-6"></section>

          <section className="rounded-xl dark:bg-neutral-800 lg:row-span-3">
            <PieChart
              data={PieChartData}
              pieDataKey="students"
              pieNameKey="program"
            />
          </section>

          <section className="rounded-xl dark:bg-neutral-800 lg:row-span-3"></section>
        </div>
      </main>
    </>
  );
};

export default CoachPage;
