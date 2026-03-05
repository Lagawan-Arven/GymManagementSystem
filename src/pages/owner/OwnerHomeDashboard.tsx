import { StackAreaChart, BarChart } from "../../components/charts";

import { TbSum } from "react-icons/tb";
import { FaCircle, FaUsers } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
import type { IconType } from "react-icons";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const thisWeekData = [
  { day: "Mon", session: 50, member: 40, walk_in: 10, new_member: 5 },
  { day: "Tue", session: 45, member: 35, walk_in: 10, new_member: 2 },
  { day: "Wed", session: 50, member: 40, walk_in: 10, new_member: 4 },
  { day: "Thu", session: 45, member: 35, walk_in: 10, new_member: 2 },
  { day: "Fri", session: 50, member: 40, walk_in: 10, new_member: 5 },
  { day: "Sat", session: 35, member: 25, walk_in: 10, new_member: 3 },
  { day: "Sun", session: 30, member: 25, walk_in: 5, new_member: 5 },
];

const thisMonthData = [
  {
    week: "week 1",
    total_sessions: 50,
    member_sessions: 40,
    walk_in_sessions: 10,
    new_member: 5,
  },
  {
    week: "week 2",
    total_sessions: 45,
    member_sessions: 35,
    walk_in_sessions: 10,
    new_member: 2,
  },
  {
    week: "week 3",
    total_sessions: 50,
    member_sessions: 40,
    walk_in_sessions: 10,
    new_member: 4,
  },
  {
    week: "week 4",
    total_sessions: 45,
    member_sessions: 35,
    walk_in_sessions: 10,
    new_member: 2,
  },
];

const getWeekSessionTotal = () => {
  let sessionTotal = 0;
  for (const data of thisWeekData) {
    sessionTotal += data["session"];
  }
  return sessionTotal;
};

const getWeekMemberSessionTotal = () => {
  let sessionTotal = 0;
  for (const data of thisWeekData) {
    sessionTotal += data["member"];
  }
  return sessionTotal;
};

const getWeekWalkinSessionTotal = () => {
  let sessionTotal = 0;
  for (const data of thisWeekData) {
    sessionTotal += data["walk_in"];
  }
  return sessionTotal;
};

const getWeekNewMemberTotal = () => {
  let sessionTotal = 0;
  for (const data of thisWeekData) {
    sessionTotal += data["new_member"];
  }
  return sessionTotal;
};

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
        <p className="text-[16px] md:text-xl">{value}</p>
      </div>
      <p className="text-[12px] md:text-[15px] text-neutral-500">{label}</p>
    </div>
  );
};

interface lineCardProp {
  label: string;
  sessions: number;
  member: number;
  walk_in: number;
  new_member: number;
}

const LineCard = ({
  label,
  sessions,
  member,
  walk_in,
  new_member,
}: lineCardProp) => {
  return (
    <div className="grid gap-2 px-2 py-2 md:px-5">
      <h1 className="text=[18px] md:text-xl">{label} </h1>
      {/* Content 1*/}
      <div className="flex text-center items-center justify-around text-[11px] md:text-[14px]">
        <div>
          <p className="text-[16px] md:text-xl text-center ">{sessions}</p>
          <p className=" text-neutral-500">Total Sessions</p>
        </div>
        <div>
          <p className="text-[16px] md:text-xl text-center ">{member}</p>
          <p className=" text-neutral-500">Member Sessions</p>
        </div>
        <div>
          <p className="text-[16px] md:text-xl text-center">{walk_in} </p>
          <p className=" text-neutral-500">Walk-in Sessions</p>
        </div>
        <div className="border rounded-xl p-1 md:p-2">
          <p className="text-[16px] md:text-xl text-center">+ {new_member} </p>
          <p className=" text-neutral-500">New Member</p>
        </div>
      </div>
    </div>
  );
};

const OwnerHomeDashboard = () => {
  return (
    <>
      {/*===================== MAIN ==================== */}
      <main className="flex flex-col md:flex-row gap-2 pt-2">
        {/* CONTAINER 1 */}
        <div className="grid gap-2 md:flex-1">
          {/*====== Today Section ========= */}
          <section className="rounded-xl bg-neutral-300 dark:bg-neutral-800">
            <LineCard
              label="Today"
              sessions={100}
              member={80}
              walk_in={20}
              new_member={5}
            />
          </section>

          {/*====== This Week Section ========= */}
          <section className="rounded-xl bg-neutral-300 dark:bg-neutral-800">
            <div className=" flex flex-col gap-2 ">
              <LineCard
                label="This Week"
                sessions={100}
                member={80}
                walk_in={20}
                new_member={5}
              />
              {/* Stack Area Chart*/}
              <div className="h-[30vh] md:h-[35vh] pr-2 md:pr-5">
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
              <div className="flex gap-2 md:gap-5 text-center">
                {/* Total Member */}
                <Card icon={TbSum} value={1000} label={"Total Members"} />
                {/* Active Member */}
                <Card
                  icon={FaCircle}
                  icon_color="text-green-500"
                  value={800}
                  label={"Active Members"}
                />
                {/* Inactive Member */}
                <Card
                  icon={FaCircle}
                  icon_color="text-neutral-500"
                  value={200}
                  label={"Inactive Members"}
                />
              </div>

              {/*--------- Session --------*/}
              <div className="flex gap-2 md:gap-5 text-center">
                {/* Total Session */}
                <Card icon={TbSum} value={2000} label={"Total Sessions"} />
                {/* Member Sessions */}
                <Card icon={FaUsers} value={1800} label={"Member Session"} />
                {/* Walk-in Sessions */}
                <Card
                  icon={FaPersonWalking}
                  value={200}
                  label={"Walk-in Session"}
                />
              </div>
            </div>
          </section>

          {/*====== This Month Section ========= */}
          <section className="order-1 md:order-2 rounded-xl bg-neutral-300 dark:bg-neutral-800">
            <div className=" flex flex-col gap-2">
              <LineCard
                label="This Month"
                sessions={100}
                member={80}
                walk_in={20}
                new_member={5}
              />
              {/* Stack Bar Chart*/}
              <div className="h-[30vh] md:h-[30vh] pr-2 md:pr-5">
                <BarChart
                  data={thisMonthData}
                  barDataKeys={[
                    "total_sessions",
                    "member_sessions",
                    "walk_in_sessions",
                    "new_member",
                  ]}
                  xAxisNameKey="week"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default OwnerHomeDashboard;
