import { useState } from "react";

import { PieChart, RadarChart } from "../../components/charts";

import { MdAdminPanelSettings } from "react-icons/md";
import { TbSum } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const admins = [
  {
    id: 1231,
    name: "Admin 1",
    member_added: { total: 1000, active: 800, inactive: 200 },
    session_recorded: { total: 1000, member: 800, walk_in: 200 },
  },
  {
    id: 1232,
    name: "Admin 2",
    member_added: { total: 1000, active: 800, inactive: 200 },
    session_recorded: { total: 1000, member: 800, walk_in: 200 },
  },
  {
    id: 1233,
    name: "Admin 3",
    member_added: { total: 1000, active: 800, inactive: 200 },
    session_recorded: { total: 1000, member: 800, walk_in: 200 },
  },
  {
    id: 1234,
    name: "Admin 4",
    member_added: { total: 1000, active: 800, inactive: 200 },
    session_recorded: { total: 1000, member: 800, walk_in: 200 },
  },
  {
    id: 1235,
    name: "Admin 5",
    member_added: { total: 1000, active: 800, inactive: 200 },
    session_recorded: { total: 1000, member: 800, walk_in: 200 },
  },
];

const adminChartData = [
  {
    admin: "Admin 1",
    member_added: 1000,
    session_recorded: 1500,
    fill: "#fb542b",
  },
  {
    admin: "Admin 2",
    member_added: 1500,
    session_recorded: 1800,
    fill: "#d5fb2b",
  },
  {
    admin: "Admin 3",
    member_added: 2000,
    session_recorded: 900,
    fill: "#2ffb2b",
  },
  {
    admin: "Admin 4",
    member_added: 1800,
    session_recorded: 1000,
    fill: "#2b77fb",
  },
  {
    admin: "Admin 5",
    member_added: 900,
    session_recorded: 2000,
    fill: "#8f2bfb",
  },
];

const LineCard = ({
  label = "overall",
  nameMember = "admin",
  valueMember = 0,
  nameSession = "admin",
  valueSession = 0,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-around text-center">
      <h1 className="text-[14px] md:text-xl self-center">{label}:</h1>
      <div className="flex justify-around md:gap-10">
        <div>
          <p className="text-sm md:text-xl">
            {nameMember}: {valueMember}
          </p>
          <p className="text-xs md:text-sm text-neutral-500">
            Most Member Added
          </p>
        </div>
        <div>
          <p className="text-sm md:text-xl">
            {nameSession}: {valueSession}
          </p>
          <p className="text-xs md:text-sm text-neutral-500">
            Most Session Recorded
          </p>
        </div>
      </div>
    </div>
  );
};

const OwnerAdminsPage = () => {
  const [index, setIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <>
      <div className="h-full w-full px-2 lg:px-5 ">
        {/*=================== HEADER ========================= */}
        <header className="flex gap-5 pb-2 border-b border-b-neutral-500">
          {/* Title */}
          <section className="flex gap-2 items-center text-red-500">
            <MdAdminPanelSettings className="size-6 md:size-8" />
            <h1 className="text-xl md:text-2xl font-bold ">Admins</h1>
          </section>
        </header>

        {/*===================== MAIN ==================== */}
        <main className="flex flex-col md:flex-row gap-3 pt-2">
          {/* CONTAINER 1 */}
          <div className="md:w-[35vw] md:grid md:gap-2">
            {/*====== Admin List Section ========= */}
            <section className={detailsOpen ? "hidden md:block" : "block"}>
              {/*----------- Section Content ---------- */}
              <div className="h-[40vh] md:h-[30vh] flex flex-col gap-2 overflow-auto px-2 py-2 md:px-5 rounded-xl bg-neutral-300 dark:bg-neutral-800">
                {admins.map((admin, index) => (
                  <div
                    onClick={() => {
                      setIndex(index);
                      setDetailsOpen(true);
                    }}
                    key={index}
                    className="px-2 py-1 md:px-5 md:py-2 rounded-xl bg-neutral-200 dark:bg-neutral-900"
                  >
                    <p>
                      {index + 1} | {admin.id} | {admin.name}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/*====== Admin Details Section ========= */}
            <section
              className={detailsOpen ? "block relative" : "hidden md:block "}
            >
              {/* Return Button */}
              <button
                onClick={() => setDetailsOpen(false)}
                className="absolute top-1 left-2 md:hidden"
              >
                <IoIosArrowBack className="size-6" />
              </button>
              {/*----------- Section Content ---------- */}
              <div className="h-[40vh] py-2 px-2 md:h-[45vh] grid gap-2 md:gap-2 content-center md:px-5 rounded-xl bg-neutral-300 dark:bg-neutral-800">
                {/* Header */}
                <h1 className="md:text-xl font-bold text-center">
                  Admin Details
                </h1>
                {/* Content 1*/}
                <div>
                  <p className="text-[16px] md:text-[18px] font-semibold">
                    ID: <span className="font-mono">{admins[index].id}</span>
                  </p>
                  <p className="text-[16px] md:text-[18px] font-semibold">
                    Name:{" "}
                    <span className="font-mono">{admins[index].name}</span>
                  </p>
                  <p className="text-[16px] md:text-[18px] font-semibold">
                    Added on:{" "}
                    <span className="font-mono text-[14px] md:text-[16px]">
                      March 15,2026 - 4:30 PM
                    </span>
                  </p>
                  <p className="text-[16px] md:text-[18px] font-semibold">
                    Updated on: <span className="font-mono"></span>
                  </p>
                </div>
                {/* Content 2*/}
                <div className="flex flex-col gap-2 md:gap-5">
                  {/* Member Added*/}
                  <div className="flex justify-around">
                    {/* Total*/}
                    <div className="text-center">
                      <p className="flex gap-1 items-center">
                        <TbSum /> Total:{" "}
                        <span>{admins[index].member_added.total}</span>{" "}
                      </p>
                      <p className="text-sm text-neutral-500">Member Added</p>
                    </div>
                    {/* Active*/}
                    <div className="text-center">
                      <p className="flex gap-1 items-center">
                        <FaCircle className="size-2 text-green-500" />{" "}
                        {admins[index].member_added.active}
                      </p>
                      <p className="text-sm text-neutral-500">Active</p>
                    </div>
                    {/* Inactive*/}
                    <div className="text-center">
                      <p className="flex gap-1 items-center">
                        <FaCircle className="size-2 text-neutral-500" />{" "}
                        {admins[index].member_added.inactive}
                      </p>
                      <p className="text-sm text-neutral-500">Inactive</p>
                    </div>
                  </div>
                  {/* Session Recorded*/}
                  <div className="flex justify-around">
                    {/* Total*/}
                    <div className="text-center">
                      <p className="flex gap-1 items-center">
                        <TbSum /> Total:{" "}
                        <span>{admins[index].session_recorded.total}</span>{" "}
                      </p>
                      <p className="text-sm text-neutral-500">
                        Session Recorded
                      </p>
                    </div>
                    {/* Member*/}
                    <div className="text-center">
                      <p className="">
                        {admins[index].session_recorded.member}
                      </p>
                      <p className="text-sm text-neutral-500">Member</p>
                    </div>
                    {/* Walk-in*/}
                    <div className="text-center">
                      <p className="">
                        {admins[index].session_recorded.walk_in}
                      </p>
                      <p className="text-sm text-neutral-500">Walk-in</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* CONTAINER 2 */}
          <div className="md:flex-1 grid gap-2">
            {/*====== Admin Analytics Section ========= */}
            <section className=" md:h-[35vh] py-2 md:px-5 grid gap-2 md:gap-5 content-center rounded-xl bg-neutral-300 dark:bg-neutral-800">
              {/*--------- Header--------- */}
              <h1 className="text-[18px] md:text-xl font-semibold text-center">
                Admin Analytics
              </h1>
              {/*---------Main Content -----------*/}
              <div className="grid gap-2">
                {/* Overall */}
                <LineCard
                  label="Overall"
                  nameMember="Admin 1"
                  valueMember={2000}
                  nameSession="Admin 4"
                  valueSession={2000}
                />
                {/* This Week */}
                <LineCard
                  label="This Week"
                  nameMember="Admin 1"
                  valueMember={2000}
                  nameSession="Admin 4"
                  valueSession={2000}
                />
                {/* This Month */}
                <LineCard
                  label="This Month"
                  nameMember="Admin 1"
                  valueMember={2000}
                  nameSession="Admin 4"
                  valueSession={2000}
                />
              </div>
            </section>

            {/* Charts */}
            <div className="flex flex-col md:flex-row gap-2">
              {/*====== Pie Chart Section (Admin--Member Added) ========= */}
              <section className="md:flex-1 md:h-[40vh] py-2 md:px-2 rounded-xl bg-neutral-300 dark:bg-neutral-800">
                <h1 className="text-sm font-medium text-center">
                  Total Member Added by Admins
                </h1>
                <div className="h-[35vh]">
                  <PieChart
                    data={adminChartData}
                    pieDataKey="member_added"
                    pieNameKey="admin"
                  />
                </div>
              </section>
              {/*====== Radar Chart Section (Admin--Session Recorded) ========= */}
              <section className="md:flex-1 md:h-[40vh] py-2 md:px-2 rounded-xl bg-neutral-300 dark:bg-neutral-800">
                <h1 className=" text-sm font-medium text-center">
                  Total Session Recorded by Admins
                </h1>
                <div className="h-[35vh]">
                  <RadarChart
                    data={adminChartData}
                    dataKey="session_recorded"
                    nameKey="admin"
                    outerRadius={80}
                  />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default OwnerAdminsPage;
