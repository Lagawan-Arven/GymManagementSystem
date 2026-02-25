import { GiTeacher, GiProgression, GiMuscleUp } from "react-icons/gi";

const myData = [{}];

const WorkoutLogs = () => {
  const logs = [
    {
      date: "January 01,2026",
      time: "4:30 PM",
      day: "Monday",
      program: "Leg Workout",
      duration: "2 hours",
    },
    {
      date: "January 02,2026",
      time: "5:00 PM",
      day: "Tuesday",
      program: "Push Workout",
      duration: "2.5 hours",
    },
    {
      date: "January 03,2026",
      time: "4:30 PM",
      day: "Wednesday",
      program: "Pull Workout",
      duration: "2.5 hours",
    },
    {
      date: "January 03,2026",
      time: "4:30 PM",
      day: "Wednesday",
      program: "Pull Workout",
      duration: "2.5 hours",
    },
    {
      date: "January 03,2026",
      time: "4:30 PM",
      day: "Wednesday",
      program: "Pull Workout",
      duration: "2.5 hours",
    },
    {
      date: "January 03,2026",
      time: "4:30 PM",
      day: "Wednesday",
      program: "Pull Workout",
      duration: "2.5 hours",
    },
    {
      date: "January 03,2026",
      time: "4:30 PM",
      day: "Wednesday",
      program: "Pull Workout",
      duration: "2.5 hours",
    },
  ];
  return (
    <main className="lg:h-[80vh] ">
      <div className=" px-5 grid lg:grid-cols-3 lg:grid-rows-8 lg:h-full">
        <section className="flex gap-2 items-center">
          <GiMuscleUp size={25} />
          <h1 className="font-bold lg:text-2xl">Workout Logs</h1>
        </section>
        <section className="overflow-auto lg:px-2 lg:py-4 lg:row-span-7 lg:col-start-1 lg:rounded-tl-xl lg:rounded-bl-xl bg-neutral-300 dark:bg-neutral-800">
          {logs.map((log, index) => (
            <div
              key={index}
              className="relative lg:px-3 lg:py-2 lg:mb-3 lg:rounded-2xl bg-neutral-400 dark:bg-neutral-900 hover:bg-neutral-700 "
            >
              <h1 className="lg:text-xl">
                {log.program} <br />{" "}
                <span className="text-xs font-extralight text-neutral-500">
                  {log.date} - {log.time} - {log.day}
                </span>
              </h1>
              <button className="absolute top-0 right-2 items-center text-neutral-500 dark:text-neutral-600 lg:text-5xl">
                ›
              </button>
            </div>
          ))}
        </section>
        <section className="lg:row-span-7 lg:col-span-2 lg:rounded-tr-xl lg:rounded-br-xl bg-neutral-300 dark:bg-neutral-800"></section>
      </div>
    </main>
  );
};

export default WorkoutLogs;
