import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";

const AppRouter = lazy(() => import("./router"));
const queryClient = new QueryClient();

function App() {
  console.log("Rendering root app");
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <Suspense
            fallback={
              <div className="text-4xl font-bold dark:bg-white dark:text-black">
                {" "}
                Page Loading...
              </div>
            }
          >
            <QueryClientProvider client={queryClient}>
              <AppRouter />
            </QueryClientProvider>
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
