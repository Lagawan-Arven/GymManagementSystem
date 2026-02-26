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
  return (
    <>
      <main className="h-auto lg:h-[80vh] ">
        <div className="flex flex-col gap-5 px-5 md:grid md:grid-cols-2 md:grid-rows-11 lg:grid-cols-3 lg:grid-rows-8 lg:gap-y-5 lg:gap-x-5 lg:h-full">
          {/*===================================HEADER =================================*/}
          <section className="flex items-center gap-2 md:order-1 lg:col-span-2">
            <LayoutDashboard className="" />
            <h1 className="text-xl lg:text-2xl font-bold">Workout Dashboard</h1>
          </section>
          {/*========================Membership Status===============================*/}
          <section className="flex items-center gap-2 md:order-2 md:justify-center lg:col-start-3 ">
            <GrStatusGood className="size-6" />
            <h1 className="text-sm lg:text-xl font-bold">
              Status:{" "}
              <span className="text-xs lg:text-sm font-light">
                Regular Membership
              </span>
            </h1>
          </section>
          {/*================================Workout Session Total ===============================*/}
          <section className="flex items-center gap-2 rounded-xl bg-neutral-300 dark:bg-neutral-800 md:order-3 md:pl-2">
            <TbSum />
            <h1 className="text-xs lg:text-[1rem]">Workout Session Total:</h1>
          </section>
          {/*============================Average workout duration=============================*/}
          <section className="flex items-center gap-2  rounded-xl bg-neutral-300 dark:bg-neutral-800 md:order-4 md:pl-2">
            <Timer />
            <h1 className="text-xs lg:text-[1rem]">
              Average workout duration:
            </h1>
          </section>
          {/*====================BMI ======================*/}
          <section className="h-[80vh] md:h-[75vh] md:order-6 md:row-span-6 lg:order-5 lg:h-auto lg:row-span-7 rounded-xl bg-neutral-300 dark:bg-neutral-800">
            <div className="flex flex-col h-full">
              <div className="relative flex-1">
                <div className="absolute top-2 left-2 flex gap-2">
                  <Activity />
                  <h1>Body Mass Index</h1>
                </div>
                <BMIChart bmi={22.5} />
              </div>

              <div className="relative flex-1 pr-6 lg:pr-0">
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
                <div className="justify-self-end">
                  <HumanBodyBMI bmi={22.5} />
                </div>
              </div>
            </div>
          </section>
          {/*=====================================Month Chart==========================================*/}
          <section className="h-[30vh] md:h-auto md:order-8 md:row-span-3 md:col-span-2 lg:order-6 lg:h-auto lg:col-span-2 lg:row-span-3 py-2 px-2 rounded-xl bg-neutral-300 dark:bg-neutral-800">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <BarChart
                data={MonthChartData}
                barDataKey="workout"
                xAxisDataKey="month"
              />
            </ErrorBoundary>
          </section>
          {/*=======================================Coach Chart =====================================*/}
          <section className="h-[30vh] md:h-auto md:order-5 md:row-span-3 lg:order-7 lg:h-auto lg:row-span-3 items-center rounded-xl bg-neutral-300 dark:bg-neutral-800">
            <RadarChart />
          </section>
          {/*========================================Program Chart=====================================*/}
          <section className="h-[30vh] md:h-auto md:order-7 md:row-span-3 lg:order-8 lg:h-auto lg:row-span-3 rounded-xl bg-neutral-300 dark:bg-neutral-800">
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
