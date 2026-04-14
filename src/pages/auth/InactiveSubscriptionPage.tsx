import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export const InactiveSubscriptionPage = () => {
  return (
    <div className="bg-muted/20 flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border-red-500/20 text-center shadow-lg">
        <CardHeader className="space-y-4 pb-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
            <ShieldAlert className="h-10 w-10 text-red-500" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Subscription Inactive
            </CardTitle>
            <CardDescription className="text-base">
              Your gym's ArvFit subscription has expired or is currently
              suspended.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4 text-left text-sm text-amber-600 dark:text-amber-500">
            <strong>Access Restricted:</strong> Owner-level access is required
            to continue. Please contact the Gym Owner so they can log in,
            navigate to the Billing page, and reactivate the account.
          </div>
        </CardContent>

        <CardFooter>
          <Button asChild className="w-full" variant="default">
            <Link to="/login">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
