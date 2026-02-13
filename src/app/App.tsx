import AppRouter from "./router";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthPageProvider } from "../context/AuthPageContext";
import { AuthProvider } from "../context/AuthContext";

function App() {
  console.log("Rendering root app");
  return (
    <>
      <AuthProvider>
        <AuthPageProvider>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </AuthPageProvider>
      </AuthProvider>
    </>
  );
}

export default App;
