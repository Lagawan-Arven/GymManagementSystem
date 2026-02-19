import { ThemeProvider } from "../context/ThemeContext";
import { AuthPageProvider } from "../context/AuthPageContext";
import { AuthProvider } from "../context/AuthContext";

import { Suspense, lazy } from "react";

const AppRouter = lazy(() => import("./router"));

function App() {
  console.log("Rendering root app");
  return (
    <>
      <AuthProvider>
        <AuthPageProvider>
          <ThemeProvider>
            <Suspense
              fallback={
                <div className="text-4xl font-bold dark:bg-white dark:text-black">
                  {" "}
                  Page Loading...
                </div>
              }
            >
              <AppRouter />
            </Suspense>
          </ThemeProvider>
        </AuthPageProvider>
      </AuthProvider>
    </>
  );
}

export default App;
