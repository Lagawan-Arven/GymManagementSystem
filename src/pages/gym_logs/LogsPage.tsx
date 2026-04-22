import { useState } from "react";
import { format, isToday, isThisWeek, isThisMonth } from "date-fns";
import { Activity, ShieldAlert, User, CreditCard } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { useGetLogs } from "../../hooks/useLogsApi"; // Reusing your existing hook!

export const LogsPage = () => {
  const { data: logs, isLoading, isError } = useGetLogs();

  // Filter States (Matching your exact default requirements)
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("today");

  // ==========================================
  // CLIENT-SIDE FILTERING LOGIC
  // ==========================================
  const filteredLogs =
    logs?.filter((log) => {
      // 1. Category Filter
      if (categoryFilter !== "all" && log.category !== categoryFilter) {
        return false;
      }

      // 2. Date Filter
      const logDate = new Date(log.created_at);
      if (dateFilter === "today" && !isToday(logDate)) return false;
      if (dateFilter === "this_week" && !isThisWeek(logDate)) return false;
      if (dateFilter === "this_month" && !isThisMonth(logDate)) return false;
      // if 'all', it passes through automatically

      return true;
    }) || [];

  // ==========================================
  // RENDER HELPERS
  // ==========================================

  // Helper to format the Actor column
  const renderActor = (admin: any) => {
    if (admin && admin.name) {
      return (
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"
          >
            Admin
          </Badge>
          <span className="text-sm">{admin.name}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <Badge className="border-amber-500/20 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20">
          Owner
        </Badge>
        <span className="text-sm font-medium">You</span>
      </div>
    );
  };

  // Helper to format the Resource column based on Category
  const renderResource = (log: any) => {
    if (log.category === "member" && log.member) {
      return (
        <div className="flex flex-col">
          <span className="flex items-center gap-1 text-sm font-medium">
            <User className="h-3 w-3" /> {log.member.name}
          </span>
          <span className="text-muted-foreground text-xs">
            ID: {log.member.id}
          </span>
        </div>
      );
    }
    if (log.category === "payment" && log.payment) {
      return (
        <div className="flex flex-col">
          <span className="flex items-center gap-1 text-sm font-medium">
            <CreditCard className="h-3 w-3" />{" "}
            {log.payment.type.replace("_", " ")}
          </span>
          <span className="text-muted-foreground text-xs">
            ID: #{log.payment.id}
          </span>
        </div>
      );
    }
    if (log.category === "session" && log.session) {
      return (
        <div className="flex flex-col">
          <span className="flex items-center gap-1 text-sm font-medium">
            <Activity className="h-3 w-3" /> Session
          </span>
          <span className="text-muted-foreground text-xs">
            ID: {log.session.id}
          </span>
        </div>
      );
    }
    return <span className="text-muted-foreground text-xs">N/A</span>;
  };

  // Helper for Category Icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "member":
        return <User className="h-4 w-4 text-emerald-500" />;
      case "payment":
        return <CreditCard className="h-4 w-4 text-emerald-500" />;
      case "session":
        return <Activity className="h-4 w-4 text-emerald-500" />;
      default:
        return <ShieldAlert className="h-4 w-4 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Audit Logs</h2>
        <p className="text-muted-foreground">
          Track all system activities, member updates, and payment recordings.
        </p>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-card border-border flex flex-col gap-4 rounded-lg border p-4 shadow-sm sm:flex-row">
        <div className="w-full space-y-1 sm:w-50">
          <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            Date Range
          </label>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this_week">This Week</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full space-y-1 sm:w-50">
          <label className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            Category
          </label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="member">Members</SelectItem>
              <SelectItem value="payment">Payments</SelectItem>
              <SelectItem value="session">Sessions</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-card rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-45">Date & Time</TableHead>
              <TableHead>Activity Details</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Resource</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground h-24 text-center"
                >
                  Loading audit logs...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-red-500"
                >
                  Failed to load logs.
                </TableCell>
              </TableRow>
            ) : filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center">
                  <div className="text-muted-foreground flex flex-col items-center justify-center space-y-2">
                    <Activity className="h-8 w-8 opacity-20" />
                    <p>No activities found for the selected filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-muted-foreground pt-4 align-top whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-foreground font-medium">
                        {format(new Date(log.created_at), "MMM dd, yyyy")}
                      </span>
                      <span className="text-xs">
                        {format(new Date(log.created_at), "hh:mm a")}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="pt-4 align-top">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-md bg-emerald-500/10 p-1.5">
                        {getCategoryIcon(log.category)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{log.details}</span>
                        <span className="text-muted-foreground mt-1 text-xs tracking-wider uppercase">
                          {log.category}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="pt-4 align-top">
                    {renderActor(log.admin)}
                  </TableCell>

                  <TableCell className="pt-4 align-top">
                    {renderResource(log)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
