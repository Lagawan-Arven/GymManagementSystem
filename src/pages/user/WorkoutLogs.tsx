import { useState } from "react";
import { GiMuscleUp } from "react-icons/gi";

const logs = [
  {
    name: "Workout 1",
    date: "January 01,2026",
    time_in: "4:30 PM",
    time_out: "6:30 PM",
    day: "Monday",
    program: "Leg Workout",
    duration: "2 hours",
    coach: "None",
  },
  {
    name: "Workout 2",
    date: "January 02,2026",
    time_in: "4:30 PM",
    time_out: "7:00 PM",
    day: "Tuesday",
    program: "Push Workout",
    duration: "2.5 hours",
    coach: "Troy",
  },
  {
    name: "Workout 3",
    date: "January 03,2026",
    time_in: "4:30 PM",
    time_out: "7:00 PM",
    day: "Wednesday",
    program: "Pull Workout",
    duration: "2.5 hours",
    coach: "None",
  },
  {
    name: "Workout 4",
    date: "January 03,2026",
    time_in: "4:30 PM",
    time_out: "7:00 PM",
    day: "Wednesday",
    program: "Pull Workout",
    duration: "2.5 hours",
    coach: "Klyd",
  },
  {
    name: "Workout 5",
    date: "January 03,2026",
    time_in: "4:30 PM",
    time_out: "7:00 PM",
    day: "Wednesday",
    program: "Pull Workout",
    duration: "2.5 hours",
    coach: "Wilson",
  },
  {
    name: "Workout 6",
    date: "January 03,2026",
    time_in: "4:30 PM",
    time_out: "7:00 PM",
    day: "Wednesday",
    program: "Pull Workout",
    duration: "2.5 hours",
    coach: "James",
  },
  {
    name: "Workout 7",
    date: "January 03,2026",
    time_in: "4:30 PM",
    time_out: "7:00 PM",
    day: "Wednesday",
    program: "Pull Workout",
    duration: "2.5 hours",
    coach: "Justin",
  },
];

const WorkoutLogs = () => {
  const [contentOpen, setContentOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <main className="h-[80vh] lg:h-[80vh] ">
      <div className="px-5 py-3 grid gap-y-5 gap-2 lg:grid-cols-3 lg:grid-rows-8 lg:h-full">
        {/*========= HEADER ============= */}
        <section>
          <div className="flex gap-2 items-center">
            <GiMuscleUp size={25} />
            <h1 className="font-bold text-xl lg:text-2xl">Workout Logs</h1>
          </div>
        </section>
        {/*========= LOGS============= */}
        <section
          className={`${contentOpen ? "hidden lg:block" : "block"} h-[65vh] overflow-auto border-neutral-800 border rounded-xl bg-neutral-300 dark:bg-neutral-800 lg:h-auto lg:row-span-7 lg:col-start-1`}
        >
          <div className=" grid gap-2 px-2 py-2 lg:px-2 lg:py-4 ">
            {logs.map((log, index) => (
              <div
                onClick={() => {
                  setIndex(index);
                  setContentOpen(true);
                }}
                key={index}
                className="relative pl-2 py-2 rounded-2xl lg:px-3 lg:py-2 bg-neutral-400 dark:bg-neutral-900 hover:bg-neutral-700 "
              >
                <h1 className="lg:text-xl">
                  {log.name} <br />{" "}
                  <span className="text-xs font-extralight text-neutral-500">
                    {log.date} - {log.time_in} - {log.day}
                  </span>
                </h1>
                <button className="absolute top-0 right-2 items-center text-xl text-neutral-500 dark:text-neutral-600 lg:text-5xl">
                  ›
                </button>
              </div>
            ))}
          </div>
        </section>
        {/*========= LOGS CONTENT ============= */}
        <section
          className={`${contentOpen ? "block" : "hidden lg:block"} h-[40vh] rounded-xl lg:h-auto lg:row-span-7 lg:col-span-2 bg-neutral-300 dark:bg-neutral-800`}
        >
          <div className="relative pt-13 px-3 lg:pt-5 lg:px-5">
            <button
              className="absolute left-2 top-0 text-5xl content-center lg:hidden"
              onClick={() => setContentOpen(false)}
            >
              ‹
            </button>
            <p className="absolute  top-5 left-14 text-xs dark:text-neutral-500 lg:static lg:text-center lg:text-sm">
              {logs[index].date} - {logs[index].time_in} -{" "}
              {logs[index].day}{" "}
            </p>

            <div className="flex flex-col gap-5 lg:mt-5">
              <p className="text-xl">{logs[index].name}</p>
              <p className="font-bold">
                Program:{" "}
                <span className="font-light">{logs[index].program}</span>
              </p>
              <p>
                Duration: {logs[index].duration}{" "}
                <span className="text-xs text-neutral-500">
                  ({logs[index].time_in} - {logs[index].time_out})
                </span>
              </p>
              <p>Coach: {logs[index].coach}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default WorkoutLogs;
