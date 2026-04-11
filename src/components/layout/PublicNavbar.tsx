import { Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { Button } from "../ui/button";

export const PublicNavbar = () => {
  return (
    <header className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Dumbbell className="h-6 w-6 text-red-500" />
          <span className="text-xl font-bold tracking-tight">
            Arv<span className="text-red-500">Fit</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden gap-6 md:flex">
          <Link
            to="/pricing"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-muted-foreground hover:text-foreground hidden text-sm font-medium transition-colors sm:block"
          >
            Log in
          </Link>
          <Button className="bg-red-600 text-white hover:bg-red-700" asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
