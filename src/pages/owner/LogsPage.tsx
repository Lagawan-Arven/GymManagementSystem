import { useState, useMemo, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { TbLogs } from "react-icons/tb";
import { fetchLogs } from "../../services/api/Service";

type Category = "all" | "membership" | "admin" | "payment" | "session";
type DateFilter = "today" | "week" | "month" | "all";

interface Admin {
  id: number;
  name: string;
}

interface Member {
  id: number;
  name: string;
}

interface Log {
  id: number;
  action: string;
  category: Category;
  details: any | null;
  admin: Admin | null;
  member: Member | null;
  session_id: number | null;
  payment_id: number | null;
  added_at: string;
}

interface TableProp {
  label?: string;
  style?: string;
}

const TH = ({ label, style }: TableProp) => {
  return (
    <th className={`${style} text-center p-1 border border-neutral-500`}>
      {label}
    </th>
  );
};

const TD = ({ label, style }: TableProp) => {
  return (
    <td className={`${style} text-center p-1 border border-neutral-500`}>
      {label}
    </td>
  );
};

const LogDetails = ({ content }: { content: string }) => {
  return <p>{content}</p>;
};

const LogsPage = () => {
  const [categoryFilter, setCategoryFilter] = useState<Category>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("today");

  const [logList, setLogList] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [logDetailsOpen, setLogDetailsOpen] = useState(false);

  useEffect(() => {
    const getLogs = async () => {
      try {
        setLoading(true);
        const res = await fetchLogs(dateFilter === "all" ? null : dateFilter);
        setLogList(res.logs);
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching logs: ", err);
      }
    };
    getLogs();
  }, [dateFilter]);

  {
    /*-------------- Filtered Logs -----------------*/
  }
  const filteredLogs = useMemo(() => {
    if (categoryFilter !== "all") {
      return logList.filter((log) => log.category === categoryFilter);
    }
    return logList;
  }, [categoryFilter, logList]);

  {
    /*--------- Category Filter ------------*/
  }
  const CategoryFilter = ({
    label,
    filter,
  }: {
    label: string;
    filter: Category;
  }) => {
    return (
      <div
        className={
          filter === categoryFilter
            ? " pt-2 pr-2 rounded-tr-2xl border-t border-r border-t-red-500 border-r-red-500 text-red-500"
            : " pt-2 pr-2 rounded-tr-2xl border-t border-r border-t-neutral-500 border-r-neutral-500"
        }
      >
        <h1
          onClick={() => {
            setCategoryFilter(filter);
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
    /*----------------- Date Filter -------------------*/
  }
  const DateFilterButton = ({
    label,
    filter,
  }: {
    label: string;
    filter: DateFilter;
  }) => {
    return (
      <div
        className={
          filter === dateFilter
            ? " px-2 border-r border-red-500 text-red-500"
            : " px-2 border-r border-neutral-500"
        }
      >
        <p
          onClick={() => {
            setDateFilter(filter);
            setLogDetailsOpen(false);
          }}
          className="md:font-normal font-light text-[11px] md:text-[16px]"
        >
          {label}
        </p>
      </div>
    );
  };
  {
    /*============ DETAILS RESOURCE LABEL =================== */
  }
  const handleDetailsResourceLabel = (log: Log) => {
    const category = log.category?.toLowerCase();

    if (category === "membership") {
      return log.member
        ? `Member-${log.member.id} ${log.member.name}`
        : "Member data missing";
    }
    if (category === "session") {
      if (log.member) {
        return `Member-${log.member.id} ${log.member.name} | Session-${log.session_id ?? "N/A"}`;
      }
      return `Visitor: ${log.details?.["visitor_name"] ?? "Unknown"} | Session-${log.session_id ?? "N/A"}`;
    }
    if (category === "payment") {
      if (log.member) {
        return `Member-${log.member.id} ${log.member.name} | Payment-${log.payment_id ?? "N/A"}`;
      }
      return `Payor: ${log.details?.["payor_name"] ?? "Unknown"} | Payment-${log.payment_id ?? "N/A"}`;
    }

    return "None";
  };

  {
    /*============ FRONT RESOURCE LABEL =================== */
  }
  const handleResourceLabel = (log: Log) => {
    const category = log.category?.toLowerCase();

    if (category === "membership") {
      return log.member ? `Member-${log.member.id}` : "Member data missing";
    }
    if (category === "session") {
      if (log.member) {
        return `Member-${log.member.id} | Session-${log.session_id ?? "N/A"}`;
      }
      return `Visitor | Session-${log.session_id ?? "N/A"}`;
    }
    if (category === "payment") {
      if (log.member) {
        return `Member-${log.member.id} | Payment-${log.payment_id ?? "N/A"}`;
      }
      return `Payor | Payment-${log.payment_id ?? "N/A"}`;
    }

    return "None";
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
            <CategoryFilter label="All" filter="all" />
            {/* Membership Logs */}
            <CategoryFilter label="Membership" filter="membership" />
            {/* Admin Logs */}
            <CategoryFilter label="Admin" filter="admin" />
            {/* Payment Logs */}
            <CategoryFilter label="Payment" filter="payment" />
            {/* Session Logs */}
            <CategoryFilter label="Session" filter="session" />
          </div>
        </header>

        {/*===================== MAIN ==================== */}
        <main className="pt-2 ">
          {/*--------- Main Content ------------- */}
          <div className="w-[screen] h-[67vh] md:h-[68vh] px-2 py-2 md:px-5 rounded-xl bg-neutral-300 dark:bg-neutral-800">
            {/* Body Filters */}
            <div className="grid grid-flow-col justify-around md:justify-start md:gap-5 pb-2 text-center border-b-[.5px] border-b-neutral-500">
              <DateFilterButton label="Today" filter="today" />
              <DateFilterButton label="This Week" filter="week" />
              <DateFilterButton label="This Month" filter="month" />
              <DateFilterButton label="All" filter="all" />
            </div>

            {/* Body Content */}
            {/*-------------- Logs ------------- */}
            <div
              className={
                logDetailsOpen
                  ? "hidden"
                  : " overflow-auto h-[60vh] pt-2 block "
              }
            >
              {loading ? (
                <p className=" place-self-center font-semibold text-[18px] md:text-[20px] lg:text-[24px]">
                  Loading...
                </p>
              ) : (
                <table className="w-full table-auto border-collapse border border-neutral-500">
                  <thead>
                    {/* Mobile */}
                    <tr className="text-[14px] md:hidden ">
                      <TH label="No." />
                      <TH label="[ACTION]" />
                      <TH label="Details" />
                    </tr>
                    {/* Tablet -> Laptop */}
                    <tr className="md:text-[16px] hidden md:table-row">
                      <TH label="No." />
                      <TH label="Actor" />
                      <TH label="[ACTION]" />
                      <TH label="Resource" />
                      <TH label="Details" />
                      <TH label="Timestamp" />
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mobile */}
                    {filteredLogs.map((log, index) => (
                      <tr key={log.id} className="md:hidden text-[12px]">
                        <TD label={`${index + 1}`} />
                        <TD label={`[${log.action}]`} />
                        <td
                          onClick={() => {
                            setSelectedLog(log);
                            setLogDetailsOpen(true);
                          }}
                          className="decoration-1 underline hover:decoration-2 text-center p-1 border border-neutral-500"
                        >
                          Click
                        </td>
                      </tr>
                    ))}
                    {/* Tablet -> Laptop */}
                    {filteredLogs.map((log, index) => (
                      <tr
                        key={log.id}
                        className="hidden md:table-row md:text-[12px] lg:text-[14px]"
                      >
                        <TD label={`${index + 1}`} />
                        <TD
                          label={log.admin ? `Admin-${log.admin.id}` : "Owner"}
                        />
                        <TD label={`[${log.action}]`} />
                        <TD label={handleResourceLabel(log)} />
                        <td
                          onClick={() => {
                            setSelectedLog(log);
                            setLogDetailsOpen(true);
                          }}
                          className="decoration-1 underline hover:decoration-2 text-center p-1 border border-neutral-500"
                        >
                          Click
                        </td>
                        <TD
                          label={`${new Date(log.added_at).toLocaleString(
                            undefined,
                            {
                              dateStyle: "medium",
                              timeStyle: "short",
                            },
                          )}`}
                          style="md:text-[10px] lg:text-[12px]"
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
                content={`Actor: ${
                  selectedLog?.admin
                    ? `Admin-${selectedLog.admin.id} ${selectedLog.admin.name}`
                    : "Owner"
                }`}
              />
              <LogDetails content={`Action: ${selectedLog?.action}`} />
              <LogDetails
                content={`Resource: ${selectedLog ? handleDetailsResourceLabel(selectedLog) : `None`}`}
              />
              <LogDetails
                content={`Timestamp: ${new Date(
                  selectedLog?.added_at || "",
                ).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}`}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LogsPage;
