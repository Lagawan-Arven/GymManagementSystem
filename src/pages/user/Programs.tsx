import { useId, useState } from "react";

import { IoIosFitness, IoIosAddCircle } from "react-icons/io";
import { MdOutlineDownloadDone } from "react-icons/md";

const Programs = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const ID = useId();
  const [index, setIndex] = useState(0);

  const programs = [
    "Core Workout",
    "Leg Workout",
    "Pull Workout",
    "Push Workout",
    "Arm Workout",
  ];
  return (
    <main className="h-[80vh]">
      <div className="px-2  ">
        {/* =============== HEADER ============== */}
        <header className="text-xl lg:text-2xl flex gap-2 items-center h-[5vh]">
          <IoIosFitness size={25} />
          <h1 className="font-bold lg:text-2xl">Programs</h1>
        </header>
        {/* =============== MAIN ============== */}
        <main
          className={`${detailsOpen || addOpen ? "hidden" : "block"} h-[75vh] flex flex-col gap-2 pt-2`}
        >
          {/* List of Programs */}
          <section className="rounded-xl py-2 px-2 flex flex-col gap-3 bg-neutral-200 dark:bg-neutral-800">
            {programs.map((program, index) => (
              <div
                onClick={() => {
                  setDetailsOpen(true);
                  setIndex(index);
                }}
                key={index}
                className="relative rounded-xl py-1  bg-neutral-200 dark:bg-neutral-900"
              >
                <p className="text-center">{program}</p>
                <button className="absolute right-2 top-0 leading-5 text-4xl text-neutral-500">
                  ›
                </button>
              </div>
            ))}
            <div className="justify-items-center">
              <button
                onClick={() => setAddOpen(true)}
                className="flex gap-2 items-center py-2 px-2 rounded-xl bg-neutral-200 dark:bg-neutral-900"
              >
                {" "}
                <IoIosAddCircle /> <p>Add</p>
              </button>
            </div>
          </section>
        </main>

        {/* ===============  PROGRAM DETAILS MAIN ============== */}
        <main
          className={`${detailsOpen ? "block" : "hidden"} h-[75vh] flex flex-col gap-2 pt-2`}
        >
          {/* Details of the Programs */}
          <section className="relative rounded-xl py-2 px-2 flex flex-col gap-3 bg-neutral-200 dark:bg-neutral-800">
            <h1>Program Details:</h1>
            <p>{programs[index]}</p>
            <button
              onClick={() => setDetailsOpen(false)}
              className="absolute top-0 left-0 text-4xl"
            >
              ‹
            </button>
          </section>
        </main>

        {/* =============== ADDING PROGRAM MAIN ============== */}
        <main
          className={`${addOpen ? "block" : "hidden"} h-[75vh] flex flex-col gap-2 pt-2`}
        >
          {/* Add Program Section */}
          <section className="rounded-xl py-2 px-2 flex flex-col gap-3 bg-neutral-200 dark:bg-neutral-800">
            <h1>Adding A Program</h1>
            <div>
              <p>Program Name: </p>
            </div>
            <div className="justify-items-center">
              <button className="flex gap-2 items-center py-2 px-2 rounded-xl bg-neutral-200 dark:bg-neutral-900">
                {" "}
                <MdOutlineDownloadDone /> <p>Submit</p>
              </button>
              <button onClick={() => setAddOpen(false)}>Cancel</button>
            </div>
          </section>
        </main>
      </div>
    </main>
  );
};

export default Programs;
