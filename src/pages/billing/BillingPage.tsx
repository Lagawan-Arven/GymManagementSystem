import { Check, Zap, Shield, Building } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Spinner } from "../../components/ui/loader";
import { useCheckout } from "../../hooks/useBillingApi";
import { useAuth } from "../../context/AuthProvider";

// Hardcoded MVP Plans (These map to the IDs in your backend DB)
const PRICING_PLANS = [
  {
    id: 1,
    name: "Starter",
    description: "Perfect for small or boutique gyms just getting started.",
    price: "₱499",
    interval: "/month",
    icon: Zap,
    features: [
      "Up to 100 Active Members",
      "Standard Support",
      "1 Admin Account",
    ],
    popular: true,
  },
  {
    id: 2,
    name: "Pro",
    description: "Everything you need to scale your gym operations.",
    price: "Soon",
    interval: "",
    icon: Shield,
    features: [
      "Unlimited Members",
      "Priority Support",
      "Unlimited Admin Accounts",
    ],
    popular: false,
  },
  {
    id: 3,
    name: "Enterprise",
    description: "For multi-branch franchises requiring custom setups.",
    price: "Soon",
    interval: "",
    icon: Building,
    features: [
      "Multi-Branch Support",
      "Custom API Access",
      "Dedicated Account Manager",
      "White-labeling Options",
    ],
    popular: false,
  },
];

export const BillingPage = () => {
  const { mutate: initiateCheckout, isPending } = useCheckout();
  const { subscription } = useAuth();

  const handleSubscribe = (planId: number) => {
    if (planId === 3) {
      // Handle Enterprise custom contact
      window.location.href =
        "mailto:arvenlagawan0731@gmail.com?subject=Enterprise Inquiry";
      return;
    }
    initiateCheckout(planId);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8">
      {/* Page Header */}
      <div className="space-y-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Upgrade Your Gym
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Unlock the full power of ArvFit. No hidden fees, cancel anytime.
        </p>
      </div>

      {/* Current Status Banner */}
      <div className="mx-auto max-w-2xl rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          You are currently on the{" "}
          <strong>
            {subscription?.isActive
              ? subscription.plan
                ? subscription.plan.name + " Plan"
                : "7-Day Free Trial"
              : "Expired Subscription"}
          </strong>
          .
          {subscription?.isActive ? (
            <>
              {" "}
              Your{" "}
              <span className="text-red-500 dark:text-red-400">
                {subscription?.plan ? "plan" : "trial"} expires in{" "}
                {subscription?.days_remaining}
              </span>{" "}
              days.
            </>
          ) : (
            "Subscribe to plan to continue."
          )}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-8 pt-8 md:grid-cols-2 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`relative flex flex-col ${plan.popular ? "border-primary z-10 scale-105 shadow-lg" : ""}`}
          >
            {plan.popular && (
              <div className="bg-primary text-primary-foreground absolute -top-4 right-0 left-0 mx-auto w-fit rounded-full px-3 py-1 text-xs font-medium">
                Most Popular
              </div>
            )}

            <CardHeader>
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <plan.icon className="text-primary h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="min-h-10">
                {plan.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 space-y-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.interval}</span>
              </div>

              <ul className="space-y-3 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              {plan.id === 1 && (
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Spinner /> Processing...{" "}
                    </>
                  ) : subscription?.isActive ? (
                    subscription.plan ? (
                      "Pay Now"
                    ) : (
                      "Subscribe Now"
                    )
                  ) : (
                    "Subscribe Now"
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
