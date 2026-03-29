import { parseISO, format } from "date-fns";

interface Session {
  type: string;
  added_at: string;
}

interface Member {
  isActive: boolean;
  added_at: string;
}

export const buildWeeklyData = (
  weeklySessions: Session[],
  weeklyMembers: Member[],
) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // initialize result
  const result = days.map((day) => ({
    day,
    session: 0,
    member_session: 0,
    single_session: 0,
    new_member: 0,
  }));

  const dayIndexMap: Record<string, number> = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };

  // Process sessions
  weeklySessions.forEach((s) => {
    const date = parseISO(s.added_at);
    const day = format(date, "EEE"); // "Mon", "Tue", etc.
    const index = dayIndexMap[day];

    if (index === undefined) return;

    result[index].session += 1;

    if (s.type === "member") {
      result[index].member_session += 1;
    } else {
      result[index].single_session += 1;
    }
  });

  // Process new members
  weeklyMembers.forEach((m) => {
    const date = parseISO(m.added_at);
    const day = format(date, "EEE");
    const index = dayIndexMap[day];

    if (index === undefined) return;

    result[index].new_member += 1;
  });

  return result;
};

type MonthlyData = {
  week: string;
  total_sessions: number;
  member_sessions: number;
  single_sessions: number;
  new_member: number;
};

export const buildMonthlyData = (
  monthlySessions: Session[],
  monthlyMembers: Member[],
): MonthlyData[] => {
  // Max 5 weeks possible in a month
  const result: MonthlyData[] = Array.from({ length: 5 }, (_, i) => ({
    week: `week ${i + 1}`,
    total_sessions: 0,
    member_sessions: 0,
    single_sessions: 0,
    new_member: 0,
  }));

  //  Sessions
  monthlySessions.forEach((s) => {
    const date = parseISO(s.added_at);

    const weekIndex = Math.floor((date.getDate() - 1) / 7);

    if (weekIndex < 0 || weekIndex > 4) return;

    result[weekIndex].total_sessions += 1;

    if (s.type === "member") {
      result[weekIndex].member_sessions += 1;
    } else {
      result[weekIndex].single_sessions += 1;
    }
  });

  //  New members
  monthlyMembers.forEach((m) => {
    const date = parseISO(m.added_at);

    const weekIndex = Math.floor((date.getDate() - 1) / 7);

    if (weekIndex < 0 || weekIndex > 4) return;

    result[weekIndex].new_member += 1;
  });

  return result;
};
