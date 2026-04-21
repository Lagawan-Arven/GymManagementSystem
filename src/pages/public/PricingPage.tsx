import { Check, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Link } from "react-router-dom";

const PRICING_PLANS = [
  {
    id: 1,
    name: "Starter",
    description: "Perfect for small or boutique gyms.",
    price: "₱499",
    interval: "/month",
    features: [
      "Up to 100 Active Members",
      "Standard Support",
      "1 Admin Account",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Pro",
    description: "Everything you need to scale.",
    price: "₱999",
    interval: "/month",
    features: [
      "Unlimited Members",

      "Priority Support",
      "Unlimited Admin Accounts",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    description: "For multi-branch franchises.",
    price: "Custom",
    interval: "",
    features: [
      "Multi-Branch Support",
      "Custom API Access",
      "Dedicated Account Manager",
      "White-labeling Options",
    ],
    popular: false,
  },
];

export const PricingPage = () => {
  return (
    <div className="bg-background min-h-screen py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Main Promos */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing.
          </h2>
          <p className="text-muted-foreground text-xl">
            Include a{" "}
            <strong className="text-foreground">1-Week Free Trial</strong> with
            starter plan feature access.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 ring-1 ring-red-500/20 ring-inset">
            <Sparkles className="h-4 w-4" />
            Launch Promo: Get 50% OFF your first payment!
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-5xl gap-8 pt-12 md:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col ${plan.popular ? "z-10 scale-105 border-red-500 shadow-lg" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 right-0 left-0 mx-auto w-fit rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}
              <CardHeader>
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
                      <Check className="h-4 w-4 shrink-0 text-red-500" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link to={plan.id === 3 ? "/contact" : "/register"}>
                    {plan.id === 3 ? "Contact Sales" : "Start Free Trial"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Early Adopter Tiers */}
        {/* Will implement later */}
        {/*<div className="bg-muted/50 border-border mx-auto mt-20 max-w-3xl rounded-2xl border p-8 text-center">
          <Tag className="mx-auto mb-4 h-8 w-8 text-red-500" />
          <h3 className="mb-6 text-2xl font-bold">Early Adopter Discounts</h3>
          <p className="text-muted-foreground mb-6">
            Secure your spot early and lock in a discount for your first 6
            months.
          </p>
          <div className="grid gap-4 text-sm sm:grid-cols-3">
            <div className="bg-background border-border rounded-lg border p-4 shadow-sm">
              <div className="text-foreground text-lg font-bold">50% OFF</div>
              <div className="text-muted-foreground">For the 1st Gym</div>
            </div>
            <div className="bg-background border-border rounded-lg border p-4 shadow-sm">
              <div className="text-foreground text-lg font-bold">20% OFF</div>
              <div className="text-muted-foreground">For Gyms 2 - 5</div>
            </div>
            <div className="bg-background border-border rounded-lg border p-4 shadow-sm">
              <div className="text-foreground text-lg font-bold">10% OFF</div>
              <div className="text-muted-foreground">For Gyms 6 - 10</div>
            </div>
          </div>
        </div>*/}
      </div>
    </div>
  );
};
