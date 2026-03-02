import { TbSum } from "react-icons/tb";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const OwnerHomeDashboard = () => {
  return (
    <>
      {/*===================== MAIN ==================== */}
      <main className="flex flex-col md:flex-row gap-3 pt-5">
        {/* CONTAINER 1 */}
        <div className="grid gap-2 flex-1">
          {/*====== Section 1 ========= */}
          <section className=" flex gap-3 text-xs lg:text-xl justify-self-center">
            <div className="flex gap-1 rounded-xl p-2 bg-neutral-300 dark:bg-neutral-800">
              <TbSum />
              <p>Total Members: 100</p>
            </div>
            <div className="flex gap-1 rounded-xl p-2 bg-neutral-300 dark:bg-neutral-800">
              <p>Total Session: 100</p>
            </div>
          </section>

          {/*====== This Week Section ========= */}
          <section className="">
            <div className=" flex flex-col gap-2 rounded-xl p-2 lg:p-5 bg-neutral-300 dark:bg-neutral-800">
              <h1 className="lg:text-xl">This week </h1>
              {/* Content 1*/}
              <div className="flex text-center justify-around">
                <div>
                  <p className="text-2xl text-center ">500</p>
                  <p className="text-xs text-neutral-500">Sessions</p>
                </div>
                <div>
                  <p className="text-2xl text-center">10 </p>
                  <p className="text-xs text-neutral-500">New Membership</p>
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
          </section>

          {/*====== Pie Chart Section ========= */}
          <section className=" h-[35vh] rounded-xl bg-neutral-300 dark:bg-neutral-800"></section>
        </div>

        {/* CONTAINER 2 */}
        <div className="">
          {/*====== BMI Chart Section ========= */}
          <section className=" h-[70vh] lg:h-full lg:w-[30vw] relative rounded-xl bg-neutral-300 dark:bg-neutral-800">
            {/*--------- Header--------- */}
            <div className="absolute top-2 left-5 flex gap-2">
              <h1>Body Mass Index</h1>
            </div>
            {/*---------Main Content -----------*/}
            <div className="h-full flex flex-col ">
              {/*Half Pie Chart */}
              <div className="flex-1"></div>
              {/*Human Body SVG */}
              <div className="flex-1 flex ">
                <div className="flex-1 place-self-center justify-items-center">
                  <p>BMI: 22.5 kg/m²</p>
                  <p>height: 1.67 m</p>
                  <p>weight: 70 kg</p>
                  <p>age: 22 yrs old</p>
                  <p>sex: male</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default OwnerHomeDashboard;
