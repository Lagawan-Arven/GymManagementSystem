import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { LogOut, Dumbbell, Clock } from "lucide-react";
import { Button } from "../ui/button";

export const OperationLayout = () => {
  const [time, setTime] = useState(new Date());

  // Live clock tick
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-muted/20 flex min-h-screen flex-col">
      {/* Kiosk Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-zinc-950 px-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg leading-none font-bold tracking-tight">
              Front Desk Operations
            </h1>
            <p className="mt-1 text-xs text-zinc-400">ArvFit POS Mode</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-2 text-zinc-300 sm:flex">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium tracking-wider">
              {time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
          <Button
            variant="destructive"
            className="bg-red-600 text-white hover:bg-red-700"
            asChild
          >
            <Link to="/dashboard">
              <LogOut className="mr-2 h-4 w-4" /> Exit Operation
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Kiosk Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
