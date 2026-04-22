import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  CreditCard,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import bgImage from "../../assets/workoutcover.jpg";

const features = [
  {
    name: "Member Management",
    description:
      "Track active, expiring, and churned members at a glance. Never let a renewal slip through the cracks.",
    icon: Users,
  },
  {
    name: "Financial Ledger",
    description:
      "Record day passes and membership renewals. View your 30-day revenue trends with beautifully designed charts.",
    icon: CreditCard,
  },
  {
    name: "Role-Based Access",
    description:
      "Give your front-desk staff limited access to record payments without exposing your high-level financial data.",
    icon: ShieldCheck,
  },
  {
    name: "Lightning Fast",
    description:
      "Built on modern architecture. No loading spinners, no waiting. Just instant data sync across all your devices.",
    icon: Zap,
  },
];

export const LandingPage = () => {
  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[2px]" />
        </div>

        {/* Animate-in utilities for a smooth entrance */}
        <div className="animate-in fade-in slide-in-from-bottom-8 fill-mode-both relative z-10 mx-auto max-w-5xl px-4 py-32 text-center text-white duration-1000 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Tired of manually tracking memberships and{" "}
            <span className="text-red-500">chasing paper logs?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-zinc-300">
            Try ArvFit. The simple, clean, and fast gym management system. Built
            to let you get back to the floor while we handle the rest.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-14 bg-red-600 px-8 text-lg text-white transition-transform hover:scale-105 hover:bg-red-700"
              asChild
            >
              <Link to="/register">
                Start 7-Day Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 border-zinc-500 bg-transparent px-8 text-lg text-white transition-transform hover:scale-105 hover:bg-zinc-800"
              asChild
            >
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
          <div className="mt-8 flex justify-center gap-6 text-sm text-zinc-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-red-500" /> Setup in minutes
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-red-500" /> Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mx-auto max-w-2xl text-center delay-300 duration-700">
            <h2 className="text-base leading-7 font-semibold text-red-500">
              Deploy faster
            </h2>
            <p className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to run your gym.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className="group bg-card border-border flex flex-col rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-red-500/50 hover:shadow-md"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <dt className="text-foreground flex items-center gap-x-3 text-base leading-7 font-semibold">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-red-500/10 transition-colors group-hover:bg-red-500">
                      <feature.icon
                        className="h-6 w-6 text-red-500 transition-colors group-hover:text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="text-muted-foreground mt-4 flex flex-auto flex-col text-base leading-7">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="relative isolate overflow-hidden bg-zinc-900 px-6 py-24 text-center shadow-2xl sm:px-16">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to modernize your facility?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300">
          Join gym owners who have reclaimed their time. Start your free trial
          today and see the difference immediately.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            size="lg"
            className="bg-white text-zinc-900 transition-transform hover:scale-105 hover:bg-zinc-200"
            asChild
          >
            <Link to="/register">Create your account</Link>
          </Button>
          <Link
            to="/contact"
            className="text-sm leading-6 font-semibold text-white transition-colors hover:text-red-400"
          >
            Talk to sales <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
