import { useState, useMemo } from "react";

import { FaUsers, FaClockRotateLeft } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

const members = [
  { id: 1231, name: "Arven Lagawan", status: "active" },
  { id: 1232, name: "Member 2", status: "inactive" },
  { id: 1233, name: "Member 3", status: "active" },
  { id: 1234, name: "Member 4", status: "inactive" },
];

const filters = ["all", "active", "inactive"];

const OwnerMembersPage = () => {
  const [index, setIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const filteredMembers = useMemo(() => {
    if (filter === "all") return members;
    return members.filter((member) => member.status === filter);
  }, [members, filter]);

  return (
    <>
      <div className="h-full w-full px-3 md:px-5 ">
        {/*=================== HEADER ========================= */}
        <header className="pb-2 border-b border-b-neutral-500">
          {/* Title */}
          <section className="flex gap-2 items-center md:text-2xl md:font-bold">
            <FaUsers className="md:size-5" />
            <h1 className="text-xl md:text-2xl font-bold">Members</h1>
          </section>
        </header>

        {/*===================== MAIN ==================== */}
        <main className="flex flex-col md:flex-row gap-2 pt-3 md:pt-5 w-full">
          {/* CONTAINER 1 */}
          <div
            className={
              detailsOpen
                ? "hidden md:w-[40vw] md:overflow-auto md:block "
                : "md:w-[40vw] md:overflow-auto block"
            }
          >
            {/*====== Member List ========= */}
            <section className="h-[70vh] md:h-[75vh] px-2 py-1 md:px-5 md:py-2 rounded-xl bg-neutral-300 dark:bg-neutral-800">
              {/* Filters */}
              <div className="flex gap-5 pb-1 border-b border-neutral-500">
                {filters.map((name, index) => (
                  <p
                    key={index}
                    onClick={() => setFilter(name)}
                    className={
                      name === filter
                        ? "rounded-tr-xl border-t border-r border-red-500 text-red-500 pt-1 pr-4"
                        : "rounded-tr-xl border-t border-r border-neutral-500 pt-1 pr-4"
                    }
                  >
                    {name}
                  </p>
                ))}
              </div>
              {/* The List */}
              <div className="pt-2 grid gap-2 ">
                {filteredMembers.map((member, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setIndex(index);
                      setDetailsOpen(true);
                    }}
                    className="px-2 py-1 md:py-2 md:px-5 rounded-xl bg-neutral-200 dark:bg-neutral-900"
                  >
                    <p>
                      {index + 1} | ID: {member.id} | {member.name}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* CONTAINER 2 */}
          <div
            className={
              detailsOpen
                ? "flex-1 grid gap-2 relative"
                : " hidden flex-1 md:grid gap-2 relative"
            }
          >
            {/*====== Return Button ========= */}
            <button
              onClick={() => setDetailsOpen(false)}
              className="absolute top-1 left-2 md:hidden"
            >
              <IoIosArrowBack className="size-6" />
            </button>

            {/*====== Member Details ========= */}
            <section className=" px-2 py-2 md:px-5 grid gap-0 md:gap-2 content-center rounded-xl bg-neutral-300 dark:bg-neutral-800">
              <h1 className="md:text-xl font-semibold text-center">
                Member Details
              </h1>
              {/*---------Main Content -----------*/}
              <div>
                <p>
                  Member ID: <span>{filteredMembers[index].id}</span>
                </p>
                <p>
                  Membership: <span>Regular</span>
                </p>
                <p className="flex gap-2">
                  Membership Status: <span>Active</span>{" "}
                  <span className="flex gap-1 items-center text-neutral-500 text-[10px]">
                    (<FaClockRotateLeft /> 20 days left)
                  </span>
                </p>
                {/* Sessions */}
                <div className="flex justify-around md:pt-2">
                  <div className="text-center">
                    <p>100</p>
                    <p className="text-xs md:text-sm text-neutral-500">
                      Sessions
                    </p>
                  </div>
                  <div className="text-center">
                    <p>80</p>
                    <p className="text-xs md:text-sm text-neutral-500">
                      Member
                    </p>
                  </div>
                  <div className="text-center">
                    <p>20</p>
                    <p className="text-xs md:text-sm text-neutral-500">
                      Walk-in
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Division */}
            <div className="flex flex-col md:flex-row gap-2 ">
              {/*====== Personal Details ========= */}
              <section className="flex-1 rounded-xl px-2 py-2 md:px-5 grid gap-0 md:gap-2 content-center bg-neutral-300 dark:bg-neutral-800">
                <h1 className="font-semibold text-center md:text-xl self-baseline">
                  Personal Details:
                </h1>
                <div>
                  <p>
                    Name: <span>{filteredMembers[index].name}</span>
                  </p>
                  <p>
                    Age: <span>22</span>
                  </p>
                  <p>
                    Sex: <span>Male</span>
                  </p>
                </div>
              </section>
              {/*====== Contact Details ========= */}
              <section className="flex-1 px-2 py-2 md:px-5 grid gap-0 md:gap-6 content-center rounded-xl bg-neutral-300 dark:bg-neutral-800">
                <h1 className="font-semibold text-center md:text-xl">
                  Contact Details:{" "}
                </h1>
                <div>
                  <p>
                    Email:{" "}
                    <span className="text-xs ">arvenlagawan0731@gmail.com</span>
                  </p>
                  <p>
                    Cellphone No.: <span className="text-xs ">09977617546</span>
                  </p>
                </div>
              </section>
            </div>

            {/*====== Creation Details ========= */}
            <section className="px-2 py-2 md:px-5 grid gap-0 md:gap-2 content-center rounded-xl bg-neutral-300 dark:bg-neutral-800">
              <h1 className="font-semibold text-center md:text-xl">
                Creation Details
              </h1>
              <div>
                <p>
                  Added by: <span>Admin001</span>
                </p>
                <p>
                  Added on:{" "}
                  <span className="text-xs md:text-sm">
                    March 15,2026 - Monday - 4:30 PM
                  </span>
                </p>
                <p>
                  Updated on: <span></span>
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default OwnerMembersPage;
