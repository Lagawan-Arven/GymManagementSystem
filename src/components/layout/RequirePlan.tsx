import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import { Button } from "../ui/button";

interface RequirePlanProps {
  allowedPlans: string[];
  children: ReactNode;
  fallback?: ReactNode; // What to show if they don't have access
}

export const RequirePlan = ({
  allowedPlans,
  children,
  fallback,
}: RequirePlanProps) => {
  const { user, subscription } = useAuth();

  if (!user || !subscription?.plan?.name || !allowedPlans.includes(subscription.plan.name)) {
    // If a fallback is provided, render that (e.g., a disabled button)
    if (fallback) return <>{fallback}</>;

    // Otherwise, render an "Upsell" block
    return (
      <div className="bg-muted/20 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
          <Lock className="h-6 w-6 text-amber-500" />
        </div>
        <h3 className="text-lg font-bold">Premium Feature</h3>
        <p className="text-muted-foreground mt-2 mb-4 max-w-sm text-sm">
          This feature is only available on Pro and Enterprise plans. Upgrade
          your gym to unlock it.
        </p>
        <Button asChild className="bg-amber-500 text-white hover:bg-amber-600">
          <Link to="/billing">Upgrade Plan</Link>
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};
