import { Dumbbell } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border/40 bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-red-500" />
            <span className="text-lg font-bold tracking-tight">
              Arv<span className="text-red-500">Fit</span>
            </span>
            <span className="text-muted-foreground text-[12px]">
              v{import.meta.env.VITE_APP_VERSION}
            </span>
          </div>

          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} ArvFit. Designed in Iligan City. All rights
            reserved.
          </p>

          <div className="flex gap-4">
            <a
              href="https://x.com/ItsMeArven"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <FaSquareXTwitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/arven-lagawan"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
