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
    { month: "August", workout: 30 },
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
  return (
    <>
      <main className="h-auto lg:h-[80vh] ">
        <div className="grid grid-cols-2 grid-rows-14 px-5 lg:grid-cols-3 lg:grid-rows-8 gap-y-5 gap-x-5 lg:h-full">
          {/*HEADER */}
          <section className="flex col-span-2 items-center gap-2 ">
            <LayoutDashboard className="" />
            <h1 className="text-xl lg:text-2xl font-bold">Workout Dashboard</h1>
          </section>
          {/*HEADER */}
          <section className="flex col-span-2 col-start-1 items-center gap-2 lg:col-start-3 lg:col-span-1 lg:justify-center ">
            <GrStatusGood className="size-6" />
            <h1 className="text-sm lg:text-xl font-bold">
              Status:{" "}
              <span className="text-xs lg:text-sm font-light">
                Regular Membership
              </span>
            </h1>
          </section>
          {/*HEADER */}
          <section className="flex col-span-2 items-center gap-2 lg:col-span-1 rounded-xl bg-neutral-300 dark:bg-neutral-800 lg:pl-5">
            <TbSum />
            <h1 className="text-xs lg:text-[1rem]">Workout Session Total:</h1>
          </section>
          {/*HEADER */}
          <section className="flex col-span-2 items-center gap-2 lg:col-span-1 rounded-xl bg-neutral-300 dark:bg-neutral-800 lg:pl-5">
            <Timer />
            <h1 className="text-xs lg:text-[1rem]">
              Average workout duration:
            </h1>
          </section>
          {/*HEADER */}
          <section className=" row-span-3 col-span-2 lg:row-span-7 lg:col-span-1 rounded-xl bg-neutral-300 dark:bg-neutral-800">
            <div className="flex flex-col h-full">
              <div className="relative flex-1">
                <div className="absolute top-2 left-2 flex gap-2">
                  <Activity />
                  <h1>Body Mass Index</h1>
                </div>
                <BMIChart bmi={22.5} />
              </div>

              <div className="relative flex-1">
                <div className="absolute left-5 top-5 flex flex-col gap-15 ">
                  <div className="">
                    <h1>
                      BMI:{" "}
                      <span className="font-mono">
                        22.5 kg/m² <br /> (Normal)
                      </span>{" "}
                    </h1>
                  </div>

                  <div className="text-sm">
                    <p>Height: </p>
                    <p>Weight: </p>
                    <p>Age: </p>
                    <p>Sex: </p>
                  </div>
                </div>
                <div className="justify-self-center">
                  <HumanBodyBMI bmi={22.5} />
                </div>
              </div>
            </div>
          </section>
          {/*HEADER */}
          <section className="col-span-2 row-span-3 py-2 px-2 rounded-xl bg-neutral-300 dark:bg-neutral-800">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <BarChart
                data={MonthChartData}
                barDataKey="workout"
                xAxisDataKey="month"
              />
            </ErrorBoundary>
          </section>
          {/*HEADER */}
          <section className="row-span-3 items-center rounded-xl bg-neutral-300 dark:bg-neutral-800">
            <RadarChart />
          </section>
          {/*HEADER */}
          <section className="row-span-3 rounded-xl bg-neutral-300 dark:bg-neutral-800">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <PieChart
                data={ProgramChartData}
                pieDataKey="workout"
                pieNameKey="program"
              />
            </ErrorBoundary>
          </section>
        </div>
      </main>
    </>
  );
};

export default UserPage;
