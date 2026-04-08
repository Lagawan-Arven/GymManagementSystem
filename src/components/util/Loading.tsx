import React from "react";

interface LoadingProps {
  /** Size of the spinner */
  size?: "sm" | "md" | "lg" | "xl";
  /** Optional text to display below the spinner */
  text?: string;
  /** If true, the spinner will overlay the entire screen */
  fullScreen?: boolean;
  /** Additional custom classes */
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = "md",
  text,
  fullScreen = false,
  className = "",
}) => {
  // Map sizes to Tailwind dimensions
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  // Map text sizes corresponding to the spinner size
  const textClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const spinnerContent = (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      {/* Animated SVG Spinner */}
      <svg
        className={`animate-spin text-red-500 ${sizeClasses[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="text-gray-400 opacity-20 dark:text-gray-600 dark:opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="fill-current opacity-90"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>

      {/* Optional pulsing text */}
      {text && (
        <p
          className={`animate-pulse font-medium text-gray-600 dark:text-gray-300 ${textClasses[size]}`}
        >
          {text}
        </p>
      )}
    </div>
  );

  // Render as a full-screen backdrop with blur if fullScreen is true
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-colors duration-300 dark:bg-black/80">
        {spinnerContent}
      </div>
    );
  }

  // Otherwise, render inline
  return spinnerContent;
};

export default Loading;
