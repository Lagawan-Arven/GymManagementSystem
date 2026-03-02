import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "../../components/ErrorFallback";
import {
  HumanBodyBMI,
  BMIChart,
  BarChart,
  PieChart,
  RadarChart,
} from "../../components/charts";

import { Activity, Timer, LayoutDashboard } from "lucide-react";
import { GrStatusGood } from "react-icons/gr";
import { IoIosFitness } from "react-icons/io";
import { TbSum } from "react-icons/tb";

const dataSample = [
  { month: "Jan", p1: 1000, p2: 2000 },
  { month: "Feb", p1: 500, p2: 3000 },
  { month: "March", p1: 1000, p2: 2500 },
  { month: "April", p1: 1000, p2: 2100 },
  { month: "May", p1: 500, p2: 1000 },
  { month: "June", p1: 1000, p2: 500 },
  { month: "July", p1: 500, p2: 2300 },
  { month: "August", p1: 1000, p2: 1000 },
  { month: "Sept", p1: 1000, p2: 2050 },
  { month: "Oct", p1: 500, p2: 2500 },
  { month: "Nov", p1: 1000, p2: 2600 },
  { month: "Dec", p1: 1000, p2: 2100 },
];

const UserPage = () => {
  const MonthChartData = [
    { month: "Jan", workout: 31 },
    { month: "Feb", workout: 28 },
    { month: "March", workout: 26 },
    { month: "April", workout: 25 },
    { month: "May", workout: 20 },
    { month: "June", workout: 21 },
    { month: "July", workout: 31 },
    { month: "Aug", workout: 30 },
    { month: "Sept", workout: 21 },
    { month: "Oct", workout: 27 },
    { month: "Nov", workout: 20 },
    { month: "Dec", workout: 25 },
  ];

  const ProgramChartData = [
    { program: "push", workout: 31, fill: "#0088FE" },
    { program: "pull", workout: 28, fill: "#00C49F" },
    { program: "arms", workout: 26, fill: "#FFBB28" },
    { program: "core", workout: 25, fill: "#FF8042" },
    { program: "legs", workout: 20, fill: "#8884d8" },
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <>
      <div className="h-full w-full px-2 lg:px-5 ">
        {/*=================== HEADER ========================= */}
        <header className="flex flex-col gap-2 lg:flex-row lg:justify-between">
          {/* Header Title */}
          <section className="flex gap-2 items-center">
            <LayoutDashboard />
            <h1 className="font-bold text-xl lg:text-2xl">Workout Dashboard</h1>
          </section>

          {/* Status*/}
          <section>
            <p>Status: Monthly Membership</p>
          </section>
        </header>

        {/*===================== MAIN ==================== */}
        <main className="flex flex-col md:flex-row gap-3 pt-5">
          {/* CONTAINER 1 */}
          <div className="grid gap-2 flex-1">
            {/*====== Section 1 ========= */}
            <section className=" flex gap-3 text-xs lg:text-xl justify-self-center">
              <div className="flex gap-1 rounded-xl p-2 bg-neutral-300 dark:bg-neutral-800">
                <TbSum />
                <p>Workout Total: 100</p>
              </div>
              <div className="flex gap-1 rounded-xl p-2 bg-neutral-300 dark:bg-neutral-800">
                <Timer />
                <p>Average Duration: 2 hrs</p>
              </div>
            </section>

            {/*====== This Week Section ========= */}
            <section className="">
              <div className=" flex flex-col gap-2 rounded-xl p-2 lg:p-5 bg-neutral-300 dark:bg-neutral-800">
                <h1 className="lg:text-xl">This week </h1>
                {/* Content 1*/}
                <div className="flex text-center justify-around">
                  <div>
                    <p className="text-2xl text-center ">5</p>
                    <p className="text-xs text-neutral-500">workout</p>
                  </div>
                  <div>
                    <p className="text-2xl text-center">10 Hrs.</p>
                    <p className="text-xs text-neutral-500">Duration</p>
                  </div>
                </div>
                {/* Content 2*/}
                <div className="flex justify-around py-2 lg:py-3 rounded-xl border-neutral-500 border">
                  {days.map((day, index) => (
                    <p
                      key={index}
                      className="p-1 text-xs text-center border rounded-[50%] size-[2rem]"
                    >
                      {day}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/*====== Pie Chart Section ========= */}
            <section className=" h-[35vh] rounded-xl bg-neutral-300 dark:bg-neutral-800">
              <PieChart
                data={ProgramChartData}
                pieDataKey="workout"
                pieNameKey="program"
              />
            </section>
          </div>

          {/* CONTAINER 2 */}
          <div className="">
            {/*====== BMI Chart Section ========= */}
            <section className=" h-[70vh] lg:h-full lg:w-[30vw] relative rounded-xl bg-neutral-300 dark:bg-neutral-800">
              {/*--------- Header--------- */}
              <div className="absolute top-2 left-5 flex gap-2">
                <Activity />
                <h1>Body Mass Index</h1>
              </div>
              {/*---------Main Content -----------*/}
              <div className="h-full flex flex-col ">
                {/*Half Pie Chart */}
                <div className="flex-1">
                  <BMIChart bmi={22.5} />
                </div>
                {/*Human Body SVG */}
                <div className="flex-1 flex ">
                  <HumanBodyBMI bmi={22.5} />
                  <div className="flex-1 place-self-center justify-items-center">
                    <p>BMI: 22.5 kg/m²</p>
                    <p>height: 1.67 m</p>
                    <p>weight: 70 kg</p>
                    <p>age: 22 yrs old</p>
                    <p>sex: male</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserPage;
