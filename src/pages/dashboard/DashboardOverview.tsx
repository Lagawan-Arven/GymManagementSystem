import { Users, CreditCard, Activity, AlertCircle } from "lucide-react";
import { format, subDays, isAfter } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useGetMembers } from "../../hooks/useMembersApi";
import { useGetPayments } from "../../hooks/usePaymentsApi";
import { useGetLogs } from "../../hooks/useLogsApi";

export const DashboardOverview = () => {
  const { data: members, isLoading: loadingMembers } = useGetMembers();
  const { data: payments, isLoading: loadingPayments } = useGetPayments();
  const { data: logs, isLoading: loadingLogs } = useGetLogs();

  // ==========================================
  // METRIC CALCULATIONS
  // ==========================================
  const activeMembers = members?.filter((m) => m.isActive).length || 0;

  // Calculate revenue for the last 30 days
  const thirtyDaysAgo = subDays(new Date(), 30);
  const recentRevenue =
    payments
      ?.filter((p) => isAfter(new Date(p.created_at), thirtyDaysAgo))
      ?.reduce((sum, p) => sum + p.amount, 0) || 0;

  // Find members expiring in the next 7 days
  const expiringSoon =
    members?.filter((m) => m.isActive && m.days_remaining <= 7).length || 0;

  // Format Pesos
  const formatPesos = (centavos: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(centavos / 100);
  };

  // ==========================================
  // CHART DATA PREP (Group revenue by date)
  // ==========================================
  const rawChartData =
    payments?.reduce((acc: Record<string, number>, payment) => {
      const dateStr = format(new Date(payment.created_at), "MMM dd");
      if (!acc[dateStr]) acc[dateStr] = 0;
      acc[dateStr] += payment.amount / 100; // Convert to pesos for chart
      return acc;
    }, {}) || {};

  // Convert to array for Recharts
  const chartData = Object.keys(rawChartData)
    .map((date) => ({
      name: date,
      Total: rawChartData[date],
    }))
    .slice(-7); // Just show the last 7 days of activity

  const isLoading = loadingMembers || loadingPayments || loadingLogs;

  if (isLoading) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        Loading dashboard metrics...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          Your gym's performance at a glance.
        </p>
      </div>

      {/* TOP ROW: Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              30-Day Revenue
            </CardTitle>
            <CreditCard className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatPesos(recentRevenue)}
            </div>
            <p className="text-muted-foreground text-xs">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Members
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers}</div>
            <p className="text-muted-foreground text-xs">
              Out of {members?.length || 0} total registered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transactions
            </CardTitle>
            <Activity className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments?.length || 0}</div>
            <p className="text-muted-foreground text-xs">
              Lifetime payments recorded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-500">
              Expiring Soon
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {expiringSoon}
            </div>
            <p className="text-muted-foreground text-xs">
              Members with {"<="} 7 days left
            </p>
          </CardContent>
        </Card>
      </div>

      {/* BOTTOM ROW: Charts & Logs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* REVENUE CHART */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue (Last 7 Active Days)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-75 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  {/* Subdued grid lines that work in both themes */}
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#71717a"
                    opacity={0.2}
                  />

                  {/* Neutral axis text that is legible in light and dark mode */}
                  <XAxis
                    dataKey="name"
                    stroke="#71717a"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#71717a"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₱${value}`}
                  />

                  {/* Tooltip styled to always be readable */}
                  <Tooltip
                    cursor={{ fill: "#71717a", opacity: 0.1 }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />

                  <Bar dataKey="Total" fill="#2bedfb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* RECENT ACTIVITY LOGS */}
        <Card className="col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Live audit trail from your staff.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-6">
              {logs?.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-center gap-4">
                  <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-full">
                    <Activity className="text-primary h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm leading-none font-medium">
                      {log.details}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {format(new Date(log.created_at), "MMM dd, hh:mm a")}
                    </p>
                  </div>
                </div>
              ))}
              {(!logs || logs.length === 0) && (
                <div className="text-muted-foreground text-center text-sm">
                  No recent activity.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
