import { useState, useMemo } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { TbLogs } from "react-icons/tb";

type Action =
  | "MEMBER-ADDED"
  | "ADMIN-LOG_IN"
  | "ADMIN-LOG_OUT"
  | "MEMBER-SESSION"
  | "WALK_IN-SESSION"
  | "WALK_IN-PAYMENT"
  | "MEMBERSHIP-PAYMENT";

type Details = "membership" | "admin" | "payment" | "session";

interface Admin {
  id: number;
  name: string;
}

interface Member {
  id: number;
  name: string;
}

interface Log {
  action: Action;
  details: Details;
  admin: Admin;
  member: Member | null;
  timestamp: string;
}

const logData: Log[] = [
  {
    action: "MEMBER-ADDED",
    details: "membership",
    admin: { id: 123, name: "Admin 1" },
    member: { id: 122, name: "Member 1" },
    timestamp: "03-01-2026",
  },
  {
    action: "ADMIN-LOG_IN",
    details: "admin",
    admin: { id: 123, name: "Admin 1" },
    member: null,
    timestamp: "03-01-2026",
  },
  {
    action: "MEMBER-SESSION",
    details: "session",
    admin: { id: 123, name: "Admin 1" },
    member: { id: 122, name: "Member 1" },
    timestamp: "03-01-2026",
  },
  {
    action: "WALK_IN-PAYMENT",
    details: "payment",
    admin: { id: 123, name: "Admin 1" },
    member: { id: 122, name: "Member 1" },
    timestamp: "03-01-2026",
  },
];

const TH = ({ label, style }: { label?: string; style?: string }) => {
  return (
    <th className={`${style} text-center p-1 border border-neutral-500`}>
      {label}
    </th>
  );
};

const TD = ({ label, style }: { label?: string; style?: string }) => {
  return (
    <td className={`${style} text-center p-1 border border-neutral-500`}>
      {label}
    </td>
  );
};

const LogDetails = ({ content }: { content: string }) => {
  return <p>{content}</p>;
};

const OwnerLogsPage = () => {
  const [headerFilter, setHeaderFilter] = useState<string | undefined>("all");
  const [bodyFilter, setBodyFilter] = useState<
    "today" | "this week" | "this month" | "all"
  >("today");
  const [logs] = useState<Log[]>(logData);
  const [logIndex, setLogIndex] = useState<number>(0);
  const [logDetailsOpen, setLogDetailsOpen] = useState(false);

  {
    /*-------------- Filtered Logs -----------------*/
  }
  const filteredLogs = useMemo(() => {
    if (headerFilter === "all") return logs;
    return logs.filter((log) => log.details === headerFilter);
  }, [logs, headerFilter]);

  {
    /*--------- Header Filter ------------*/
  }
  const HeaderFilter = ({
    label,
    filter,
  }: {
    label: string;
    filter: string;
  }) => {
    return (
      <div
        className={
          filter === headerFilter
            ? " pt-2 pr-2 rounded-tr-2xl border-t border-r border-t-red-500 border-r-red-500 text-red-500"
            : " pt-2 pr-2 rounded-tr-2xl border-t border-r border-t-neutral-500 border-r-neutral-500"
        }
      >
        <h1
          onClick={() => {
            setHeaderFilter(filter);
            setLogIndex(0);
            setLogDetailsOpen(false);
          }}
          className="md:font-semibold font-normal text-xs md:text-[18px]"
        >
          {label}
        </h1>
      </div>
    );
  };

  {
    /*----------------- Body Filter -------------------*/
  }
  const BodyFilter = ({ label }: { label: string }) => {
    return (
      <div className=" px-2 py-1 rounded-2xl border border-neutral-500">
        <p className="md:font-normal font-light text-[11px] md:text-[16px]">
          {label}
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="h-full w-full px-2 lg:px-5 ">
        {/*=================== HEADER ========================= */}
        <header className="w-[screen] pb-2 border-b border-b-neutral-500">
          {/* Header Title */}
          <div className="flex gap-2 items-center mb-2 md:mb-5 text-red-500">
            <TbLogs className="size-5 md:size-7" />
            <h1 className="text-[20px] md:text-2xl font-bold">Logs</h1>
          </div>
          {/* Header Filters */}
          <div className="flex justify-around md:justify-start md:gap-3">
            {/* All Logs */}
            <HeaderFilter label="All" filter="all" />
            {/* Membership Logs */}
            <HeaderFilter label="Membership" filter="membership" />
            {/* Admin Logs */}
            <HeaderFilter label="Admin" filter="admin" />
            {/* Payment Logs */}
            <HeaderFilter label="Payment" filter="payment" />
            {/* Session Logs */}
            <HeaderFilter label="Session" filter="session" />
          </div>
        </header>

        {/*===================== MAIN ==================== */}
        <main className="pt-2 ">
          {/*--------- Main Content ------------- */}
          <div className="w-[screen] h-[67vh] md:h-[68vh] px-2 py-2 md:px-5 rounded-xl bg-neutral-300 dark:bg-neutral-800">
            {/* Body Filters */}
            <div className="grid grid-flow-col justify-around md:justify-start md:gap-5 pb-2 text-center border-b-[.5px] border-b-neutral-500">
              <BodyFilter label="Today" />
              <BodyFilter label="This Week" />
              <BodyFilter label="This Month" />
              <BodyFilter label="All" />
            </div>

            {/* Body Content */}
            {/*-------------- Logs ------------- */}
            <div
              className={logDetailsOpen ? "hidden" : "overflow-auto pt-2 block"}
            >
              <table className="w-full table-auto border-collapse border border-neutral-500">
                <thead>
                  <tr className="text-[14px] md:hidden ">
                    <TH label="No." />
                    <TH label="[ACTION]" />
                    <TH label="Details" />
                    <TH label="Timestamp" />
                  </tr>
                  <tr className="md:text-[16px] hidden md:table-row">
                    <TH label="No." />
                    <TH label="[ACTION]" />
                    <TH label="Details" />
                    <TH label="Admin" />
                    <TH label="Member" />
                    <TH label="Timestamp" />
                  </tr>
                </thead>
                <tbody>
                  {/* Mobile */}
                  {filteredLogs.map((log, index) => (
                    <tr key={index} className="md:hidden text-[12px]">
                      <TD label={`${index + 1}`} />
                      <TD label={`[${log.action}]`} />
                      <td
                        onClick={() => {
                          setLogIndex(index);
                          setLogDetailsOpen(true);
                        }}
                        className="decoration-1 underline hover:decoration-2 text-center p-1 border border-neutral-500"
                      >
                        Click
                      </td>
                      <TD label={`${log.timestamp}`} />
                    </tr>
                  ))}

                  {/* Tablet -> Laptop */}
                  {filteredLogs.map((log, index) => (
                    <tr key={index} className="hidden md:table-row">
                      <TD label={`${index + 1}`} />
                      <TD label={`[${log.action}]`} />
                      <td
                        onClick={() => {
                          setLogIndex(index);
                          setLogDetailsOpen(true);
                        }}
                        className="decoration-1 underline hover:decoration-2 text-center p-1 border border-neutral-500"
                      >
                        Click here
                      </td>
                      <TD label={`ID-${log.admin.id} | ${log.admin.name}`} />
                      <TD
                        label={
                          log.member === null
                            ? `None`
                            : `ID-${log.member.id} | ${log.member.name}`
                        }
                      />
                      <TD label={`${log.timestamp}`} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/*-------------- Log Details------------- */}
            <div
              className={
                logDetailsOpen ? "relative flex flex-col gap-2 pt-2" : "hidden"
              }
            >
              {/* Return Button */}
              <button
                onClick={() => setLogDetailsOpen(false)}
                className="absolute top-2 left-2 "
              >
                <IoIosArrowBack className="size-6" />
              </button>
              <h1 className="text-center text-[16px] md:text-xl">
                Log Details
              </h1>
              <LogDetails
                content={`Admin: ${filteredLogs[logIndex].admin.id} | ${filteredLogs[logIndex].admin.name}`}
              />
              <LogDetails
                content={`Action: ${filteredLogs[logIndex].action}`}
              />
              <LogDetails
                content={
                  filteredLogs[logIndex].member
                    ? `Member: ${filteredLogs[logIndex].member.id} | ${filteredLogs[logIndex].member.name}`
                    : "Member: None"
                }
              />
              <LogDetails
                content={`Timestamp: ${filteredLogs[logIndex].timestamp}`}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default OwnerLogsPage;
