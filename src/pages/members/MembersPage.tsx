import { Search } from "lucide-react";
import { useState } from "react";

import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Skeleton } from "../../components/ui/skeleton";
import { AddMemberDialog } from "./AddMemberDialog";
import { useGetMembers } from "../../hooks/useMembersApi";
import { format } from "date-fns"; // Lightweight date formatting
import { MemberActions } from "./MemberActions";

export const MembersPage = () => {
  const { data: members, isLoading, isError } = useGetMembers();
  const [searchTerm, setSearchTerm] = useState("");

  // Client-side search filtering
  const filteredMembers =
    members?.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.email &&
          member.email.toLowerCase().includes(searchTerm.toLowerCase())),
    ) || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Members</h2>
          <p className="text-muted-foreground">
            Manage your gym members and track their active status.
          </p>
        </div>
        <AddMemberDialog />
      </div>

      {/* Toolbar (Search) */}
      <div className="flex items-center gap-2">
        <div className="relative w-full max-w-sm">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search members..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-card rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="text-right">Days Left</TableHead>
              <TableHead className="w-12.5"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-10 w-37.5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-25" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-30" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-6 w-10" />
                  </TableCell>
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-red-500"
                >
                  Failed to load members data.
                </TableCell>
              </TableRow>
            ) : filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground h-24 text-center"
                >
                  No members found.
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{member.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {member.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{member.contact_number || "-"}</TableCell>
                  <TableCell>
                    {member.isActive ? (
                      <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      >
                        Expired
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(member.expires_at), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {member.days_remaining}
                  </TableCell>

                  <TableCell>
                    <MemberActions member={member} />
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
