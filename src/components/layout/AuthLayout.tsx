import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  const navigate = useNavigate();
  return (
    <div className="bg-background flex min-h-screen flex-col md:flex-row">
      {/* Left Side: Brand Panel (Hidden on Mobile) */}
      <div className="hidden w-full items-center justify-center bg-zinc-900 text-white md:flex md:w-1/2 lg:w-[55%]">
        <div className="mx-auto max-w-lg p-12">
          <div
            onClick={() => navigate("/")}
            className="mb-8 flex items-center gap-2"
          >
            <Dumbbell className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold tracking-tight">
              Arv<span className="text-red-500">Fit</span>
            </h1>
          </div>
          <h2 className="text-4xl leading-tight font-bold">
            The Gym Management System That Actually Keeps Up.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Stop chasing paper logs and expired memberships. Get back to the
            floor while ArvFit handles the rest.
          </p>
        </div>
      </div>

      {/* Right Side: Form Panel (Full width on Mobile) */}
      <div className="flex w-full items-center justify-center p-6 md:w-1/2 lg:w-[45%]">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center md:text-left">
            {/* Mobile Logo */}
            <div className="mb-6 flex justify-center md:hidden">
              <Dumbbell className="h-10 w-10 text-red-500" />
            </div>
            <h1 className="text-foreground text-3xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
