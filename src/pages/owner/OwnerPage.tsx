import { MdDashboardCustomize } from "react-icons/md";

const OwnerPage = () => {
  return (
    <>
      <main className="h-auto px-2 lg:h-[80vh] ">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-8 lg:gap-x-2 lg:gap-y-2 lg:h-full lg:px-5">
          <section className="flex gap-2 items-center px-2 rounded-xl dark:bg-neutral-800 lg:col-span-2 lg:px-2">
            <MdDashboardCustomize />
            <h1 className="font-bold lg:text-2xl">DashBoard</h1>
          </section>

          <section className="rounded-xl dark:bg-neutral-800"></section>

          <section className="rounded-xl dark:bg-neutral-800"></section>

          <section className="rounded-xl dark:bg-neutral-800"></section>

          <section className="rounded-xl dark:bg-neutral-800"></section>

          <section className="rounded-xl dark:bg-neutral-800 lg:row-span-3 lg:col-span-2"></section>

          <section className="rounded-xl dark:bg-neutral-800 lg:row-span-6"></section>

          <section className="rounded-xl dark:bg-neutral-800 lg:row-span-3"></section>

          <section className="rounded-xl dark:bg-neutral-800 lg:row-span-3"></section>
        </div>
      </main>
    </>
  );
};

export default OwnerPage;
