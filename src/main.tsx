import "./styles/tailwind.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

import { PageLoader } from "./components/ui/loader.tsx";
import { setupMockApi } from "./api/mockSetup.ts";

const App = lazy(() => import("./App.tsx"));

// Check the environment variable
if (import.meta.env.VITE_USE_MOCKS === "true") {
  setupMockApi();
}
// Initialize Tanstack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false, // Prevents excessive API calls when switching tabs
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <App />
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
