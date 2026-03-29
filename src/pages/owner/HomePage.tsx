import { useEffect, useState, useMemo } from "react";

import { StackAreaChart, BarChart } from "../../components/charts";
import { fetchSessions, fetchMembers } from "../../services/api/Service";
import { buildWeeklyData, buildMonthlyData } from "../../util/util";

import { LayoutDashboard } from "lucide-react";
import { TbSum } from "react-icons/tb";
import { FaCircle, FaUsers } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
import type { IconType } from "react-icons";

interface cardProp {
  icon: IconType;
  icon_color?: string;
  value: number;
  label: string;
}

const Card = ({ icon: Icon, icon_color, value, label }: cardProp) => {
  return (
    <div className="flex-1 px-2 py-2 md:px-2 md:py-3 rounded-xl bg-neutral-300 dark:bg-neutral-800">
      <div className="flex gap-2 items-center justify-center">
        <Icon className={icon_color} />
        <p className="text-[16px] md:text-[18px] lg:text-xl">{value}</p>
      </div>
      <p className="text-[12px] lg:text-[15px] text-neutral-500">{label}</p>
    </div>
  );
};

interface lineCardProp {
  label: string;
  sessions: number;
  member: number;
  single: number;
  new_member: number;
}

const LineCard = ({
  label,
  sessions,
  member,
  single,
  new_member,
}: lineCardProp) => {
  return (
    <div className="grid gap-2 px-2 py-2 lg:px-5">
      <h1 className="text=[18px] md:text-xl">{label} </h1>
      {/* Content 1*/}
      <div className="flex text-center items-center justify-around text-[11px] md:text-[13px] lg:text-[14px]">
        <div>
          <p className="text-[16px] md:text-xl text-center ">{sessions}</p>
          <p className=" text-neutral-500">Total Sessions</p>
        </div>
        <div>
          <p className="text-[16px] md:text-xl text-center ">{member}</p>
          <p className=" text-neutral-500">Member Sessions</p>
        </div>
        <div>
          <p className="text-[16px] md:text-xl text-center">{single} </p>
          <p className=" text-neutral-500">Single Sessions</p>
        </div>
        <div className="border rounded-xl p-1 lg:p-2">
          <p className="text-[16px] md:text-xl text-center">+ {new_member} </p>
          <p className=" text-neutral-500">New Member</p>
        </div>
      </div>
    </div>
  );
};

interface Session {
  type: string;
  added_at: string;
}

interface Member {
  isActive: boolean;
  added_at: string;
}

const HomePage = () => {
  const [todaySessions, setTodaySessions] = useState<Session[]>([]);
  const [weeklySessions, setWeeklySessions] = useState<Session[]>([]);
  const [monthlySessions, setMonthlySessions] = useState<Session[]>([]);
  const [allSessions, setAllSessions] = useState<Session[]>([]);

  const [todayMembers, setTodayMembers] = useState<Member[]>([]);
  const [weeklyMembers, setWeeklyMembers] = useState<Member[]>([]);
  const [monthlyMembers, setMonthlyMembers] = useState<Member[]>([]);
  const [allMembers, setAllMembers] = useState<Member[]>([]);

  const [sessionLoading, setSessionLoading] = useState(true);
  const [memberLoading, setMemberLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSessions = async () => {
      try {
        const [today, week, month, all] = await Promise.all([
          fetchSessions("today"),
          fetchSessions("week"),
          fetchSessions("month"),
          fetchSessions(null),
        ]);
        setTodaySessions(today.sessions);
        setMonthlySessions(month.sessions);
        setWeeklySessions(week.sessions);
        setAllSessions(all.sessions);
        setSessionLoading(false);
      } catch (error) {
        console.error("Error while fetching sessions:", error);
      }
    };
    const getMembers = async () => {
      try {
        const [today, week, month, all] = await Promise.all([
          fetchMembers("today"),
          fetchMembers("week"),
          fetchMembers("month"),
          fetchMembers(null),
        ]);
        setTodayMembers(today.members);
        setMonthlyMembers(month.members);
        setWeeklyMembers(week.members);
        setAllMembers(all.members);
        setMemberLoading(false);
      } catch (error) {
        console.error("Error while fetching members:", error);
      }
    };
    getSessions();
    getMembers();
  }, []);

  useEffect(() => {
    if (!sessionLoading && !memberLoading) {
      setLoading(false);
    }
  }, [sessionLoading, memberLoading]);

  const thisWeekData = useMemo(() => {
    return buildWeeklyData(weeklySessions, weeklyMembers);
  }, [weeklySessions, weeklyMembers]);

  const thisMonthData = useMemo(() => {
    return buildMonthlyData(monthlySessions, monthlyMembers);
  }, [monthlySessions, monthlyMembers]);

  return (
    <>
      <div className="h-full w-full px-2 md:px-5 ">
        {/*=================== HEADER ========================= */}
        <header className="flex gap-5 pb-2 border-b border-b-neutral-500 text-red-500">
          {/* Dashboard */}
          <div className="flex gap-2 items-center ">
            <LayoutDashboard />
            <h1 className=" text-[18px] font-bold md:text-xl">Dashboard</h1>
          </div>
        </header>

        {/*===================== MAIN ==================== */}
        {loading ? (
          <div className="h-full content-center text-center">
            <p className="md:text-[18px] lg:text-[20px] font-semibold">
              Loading...
            </p>
          </div>
        ) : (
          <main className="flex flex-col md:flex-row gap-2 pt-2">
            {/* CONTAINER 1 */}
            <div className="grid gap-2 md:flex-1">
              {/*====== Today Section ========= */}
              <section className="rounded-xl bg-neutral-300 dark:bg-neutral-800">
                <LineCard
                  label="Today"
                  sessions={todaySessions ? todaySessions.length : 0}
                  member={
                    todaySessions
                      ? todaySessions.filter(
                          (session) => session.type === "member",
                        ).length
                      : 0
                  }
                  single={
                    todaySessions
                      ? todaySessions.filter(
                          (session) => session.type === "single",
                        ).length
                      : 0
                  }
                  new_member={todayMembers ? todayMembers.length : 0}
                />
              </section>

              {/*====== This Week Section ========= */}
              <section className=" rounded-xl bg-neutral-300 dark:bg-neutral-800">
                <div className=" flex flex-col gap-2 ">
                  <LineCard
                    label="This Week"
                    sessions={weeklySessions ? weeklySessions.length : 100}
                    member={
                      weeklySessions
                        ? weeklySessions.filter(
                            (session) => session.type === "member",
                          ).length
                        : 100
                    }
                    single={
                      weeklySessions
                        ? weeklySessions.filter(
                            (session) => session.type === "single",
                          ).length
                        : 100
                    }
                    new_member={weeklyMembers ? weeklyMembers.length : 100}
                  />
                  {/* Stack Area Chart*/}
                  <div className="h-[30vh] md:h-[35vh] lg:h-[38vh] pr-2 md:pr-5">
                    <StackAreaChart data={thisWeekData} />
                  </div>
                </div>
              </section>
            </div>

            {/* CONTAINER 2 */}
            <div className="md:flex-1 grid gap-2">
              {/*====== Totals Section ========= */}
              <section className="order-2 md:order-1">
                <div className="grid gap-2 ">
                  {/*--------- Member --------*/}
                  <div className="flex gap-2 text-center">
                    {/* Total Member */}
                    <Card
                      icon={TbSum}
                      value={allMembers ? allMembers.length : 100}
                      label={"Total Members"}
                    />
                    {/* Active Member */}
                    <Card
                      icon={FaCircle}
                      icon_color="text-green-500 size-2"
                      value={
                        allMembers
                          ? allMembers.filter((member) => member.isActive)
                              .length
                          : 100
                      }
                      label={"Active Members"}
                    />
                    {/* Inactive Member */}
                    <Card
                      icon={FaCircle}
                      icon_color="text-neutral-500 size-2"
                      value={
                        allMembers
                          ? allMembers.filter(
                              (member) => member.isActive === false,
                            ).length
                          : 100
                      }
                      label={"Inactive Members"}
                    />
                  </div>

                  {/*--------- Session --------*/}
                  <div className="flex gap-2 text-center">
                    {/* Total Session */}
                    <Card
                      icon={TbSum}
                      value={allSessions ? allSessions.length : 2000}
                      label={"Total Sessions"}
                    />
                    {/* Member Sessions */}
                    <Card
                      icon={FaUsers}
                      value={
                        allSessions
                          ? allSessions.filter(
                              (session) => session.type === "member",
                            ).length
                          : 100
                      }
                      label={"Member Sessions"}
                    />
                    {/* Walk-in Sessions */}
                    <Card
                      icon={FaPersonWalking}
                      value={
                        allSessions
                          ? allSessions.filter(
                              (session) => session.type === "single",
                            ).length
                          : 100
                      }
                      label={"Single Sessions"}
                    />
                  </div>
                </div>
              </section>

              {/*====== This Month Section ========= */}
              <section className="order-1 md:order-2 rounded-xl bg-neutral-300 dark:bg-neutral-800">
                <div className=" flex flex-col gap-2">
                  <LineCard
                    label="This Month"
                    sessions={monthlySessions ? monthlySessions.length : 100}
                    member={
                      monthlySessions
                        ? monthlySessions.filter(
                            (session) => session.type === "member",
                          ).length
                        : 100
                    }
                    single={
                      monthlySessions
                        ? monthlySessions.filter(
                            (session) => session.type === "single",
                          ).length
                        : 100
                    }
                    new_member={monthlyMembers ? monthlyMembers.length : 100}
                  />
                  {/* Stack Bar Chart*/}
                  <div className="h-[30vh] md:h-[32vh] lg:h-[33vh] pr-2 md:pr-5">
                    <BarChart
                      data={thisMonthData}
                      barDataKeys={[
                        "total_sessions",
                        "member_sessions",
                        "single_sessions",
                        "new_member",
                      ]}
                      xAxisNameKey="week"
                    />
                  </div>
                </div>
              </section>
            </div>
          </main>
        )}
      </div>
    </>
  );
};

export default HomePage;
