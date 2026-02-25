import { GiTeacher } from "react-icons/gi";

const Coaches = () => {
  return (
    <main className="h-[75vh] bg-neutral-300 dark:bg-neutral-800 lg:mx-10 lg:mb-10 lg:h-[75vh] lg:rounded-2xl">
      <div className=" px-5 pb-3 h-full ">
        <section className="flex gap-2 items-center">
          <GiTeacher size={25} />
          <h1 className="font-bold lg:text-2xl">Coaches</h1>
        </section>
      </div>
    </main>
  );
};

export default Coaches;
