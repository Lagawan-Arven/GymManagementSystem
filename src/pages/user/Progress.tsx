import { GiProgression } from "react-icons/gi";

const Progress = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <main className="h-[80vh] ">
      <div className="overflow-auto px-2 h-full lg:px-5 lg:pb-10">
        {/*=========== HEADER =============== */}
        <header className="flex gap-2 items-center h-[5vh] lg:h-auto mb-2 px-2 lg:px-5 lg:mb-5 ">
          <GiProgression size={25} />
          <h1 className="font-bold lg:text-2xl">Progress</h1>
        </header>

        {/*=========== MAIN =============== */}
        <main className="flex flex-col lg:flex-row h-full gap-3 lg:gap-5">
          {/*=========== SECTION 1 =============== */}
          <section className="lg:flex-1 flex flex-col gap-3 lg:gap-5 h-[70vh] lg:h-auto">
            {/* This Week Section*/}
            <div className="flex flex-col gap-2 rounded-xl p-2 lg:p-5 bg-neutral-300 dark:bg-neutral-800">
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
            {/* This Month Section */}
            <div className="rounded-xl px-2 py-2 lg:px-2 lg:py-3 bg-neutral-300 dark:bg-neutral-800">
              <h1 className="lg:text-xl">This Month</h1>
              {/* Content 1*/}
              <div className=" p-2 rounded-xl ">
                <div className="flex justify-between mb-2">
                  <h1>March</h1>
                  <p>2026</p>
                </div>
                <div className="flex justify-around pb-2 mb-2 border-b border-neutral-500">
                  {days.map((day, index) => (
                    <p key={index} className="text-xs lg:text-sm font-bold">
                      {day.charAt(0)}
                    </p>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((num) => (
                    <div
                      key={num}
                      className="text-xs lg:text-sm text-center border border-neutral-500 lg:h-[5vh] lg:py-2"
                    >
                      {" "}
                      {num}{" "}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/*=========== SECTION 2 =============== */}
          <section className="h-[35vh] lg:flex-1 lg:h-auto bg-neutral-300 dark:bg-neutral-800">
            <h1>Goals, PRs, Body Metrics</h1>
          </section>
        </main>
      </div>
    </main>
  );
};

export default Progress;
