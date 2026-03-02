import { MdAdminPanelSettings } from "react-icons/md";

const admins = [
  { id: 1, name: "Admin 1" },
  { id: 2, name: "Admin 2" },
  { id: 3, name: "Admin 3" },
];

const OwnerAdminsPage = () => {
  return (
    <>
      <div className="h-full w-full px-2 lg:px-5 ">
        {/*=================== HEADER ========================= */}
        <header className="flex gap-5 pb-2 border-b border-b-neutral-500">
          {/* Title */}
          <section className="flex gap-2 items-center">
            <MdAdminPanelSettings className="lg:size-5" />
            <h1>Admins</h1>
          </section>
        </header>

        {/*===================== MAIN ==================== */}
        <main className="flex flex-col md:flex-row gap-3 pt-5">
          {/* CONTAINER 1 */}
          <div className="">
            {/*====== Admin List ========= */}
            <section className=" ">
              {admins.map((admin, index) => (
                <div key={index}>
                  <p>{admin.name}</p>
                </div>
              ))}
            </section>
          </div>

          {/* CONTAINER 2 */}
          <div className="flex-1">
            {/*====== Admin Details ========= */}
            <section className=" h-[70vh] lg:h-full lg:w-[30vw] relative rounded-xl bg-neutral-300 dark:bg-neutral-800">
              {/*--------- Header--------- */}
              <div className="absolute top-2 left-5 flex gap-2">
                <h1>Admin Details</h1>
              </div>
              {/*---------Main Content -----------*/}
              <div className="h-full flex flex-col "></div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default OwnerAdminsPage;
