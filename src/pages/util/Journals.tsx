import { IoIosJournal } from "react-icons/io";

const Journals = () => {
  return (
    <main className="h-[80vh] overflow-auto">
      <div className=" px-5 pb-3 h-full ">
        <header className="h-[10vh] flex gap-2 items-center">
          <IoIosJournal size={25} />
          <h1 className="font-bold lg:text-2xl">Journals</h1>
        </header>
        <main className="h-[70vh] bg-neutral-300 dark:bg-neutral-800"></main>
      </div>
    </main>
  );
};

export default Journals;
