import { format } from "date-fns";
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
import { RecordPaymentDialog } from "./RecordPaymentDialog";
import { useGetPayments } from "../../hooks/usePaymentsApi";

export const PaymentsPage = () => {
  const { data: payments, isLoading, isError } = useGetPayments();

  // Helper to format centavos to Pesos
  const formatPesos = (centavos: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(centavos / 100);
  };

  // Helper to make the payment type readable
  const formatType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Financial Ledger
          </h2>
          <p className="text-muted-foreground">
            Track day passes, membership renewals, and daily income.
          </p>
        </div>
        <RecordPaymentDialog />
      </div>

      {/* Data Table */}
      <div className="bg-card rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Transaction Details</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
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
                  Failed to load transactions.
                </TableCell>
              </TableRow>
            ) : !payments || payments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground h-24 text-center"
                >
                  No transactions recorded yet.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {format(new Date(payment.created_at), "MMM dd, hh:mm a")}
                  </TableCell>
                  <TableCell className="font-medium">
                    {/* Display Member Name if it exists, otherwise Visitor Name */}
                    {payment.payor_name || payment.member.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {formatType(payment.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell className="text-right font-bold text-emerald-600 dark:text-emerald-400">
                    {formatPesos(payment.amount)}
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
