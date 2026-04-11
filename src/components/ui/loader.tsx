import { Loader2, Dumbbell } from "lucide-react";
import { cn } from "../../lib/utils";

interface SpinnerProps {
  className?: string;
  size?: number;
}

/**
 * 1. The Inline Spinner
 * Perfect for buttons, small inline data fetches, or tight spaces.
 */
export const Spinner = ({ className, size = 24 }: SpinnerProps) => {
  return (
    <Loader2
      size={size}
      className={cn("text-primary animate-spin", className)}
    />
  );
};

/**
 * 2. The Full Page Loader
 * Perfect for initial app mount (e.g., inside AuthProvider) or heavy route transitions.
 * Features a pulsing and bouncing brand logo.
 */
export const PageLoader = () => {
  return (
    <div className="bg-background flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* The logo bounces while the text pulses */}
        <div className="animate-bounce rounded-full bg-red-500/10 p-4">
          <Dumbbell className="h-10 w-10 text-red-500" />
        </div>
        <p className="text-muted-foreground animate-pulse text-sm font-medium">
          Warming up...
        </p>
      </div>
    </div>
  );
};

/**
 * 3. The Section Overlay Loader
 * Perfect for placing over a Card or a specific div while it's submitting data,
 * preventing the user from clicking anything else inside that section.
 */
export const SectionLoader = ({
  text = "Processing...",
}: {
  text?: string;
}) => {
  return (
    <div className="rounded-inherit bg-background/80 absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
      <Spinner size={32} className="mb-2 text-red-500" />
      <p className="text-foreground text-sm font-medium">{text}</p>
    </div>
  );
};
