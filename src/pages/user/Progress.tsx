import { GiProgression } from "react-icons/gi";

const Progress = () => {
  return (
    <main className=" lg:h-[80vh] ">
      <div className=" px-5 pb-3 h-full grid lg:grid-cols-3 lg:grid-rows-8">
        <section className="flex gap-2 items-center">
          <GiProgression size={25} />
          <h1 className="font-bold lg:text-2xl">Progress</h1>
        </section>
        <section className="lg:py-2 lg:px-2 lg:row-span-7 lg:col-span-2 lg:col-start-1 bg-neutral-300 dark:bg-neutral-800">
          <h1 className="">This week 5 workouts 10 hours</h1>
          This Month
        </section>
        <section className="lg:row-span-7 bg-neutral-300 dark:bg-neutral-800">
          <h1>Goals, PRs, Body Metricsd</h1>
        </section>
      </div>
    </main>
  );
};

export default Progress;
