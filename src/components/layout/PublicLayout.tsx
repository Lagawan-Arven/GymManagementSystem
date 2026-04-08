import { Outlet } from "react-router-dom";

import PublicTopBar from "../navigation/PublicTopBar";
import Footer from "../navigation/Footer";

const PublicLayout = () => {
  return (
    <>
      <div className="bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
        <div className="relative">
          {/*=================== HEADER =======================*/}
          <header className="fixed z-10 h-[10vh] w-full bg-white/70 md:h-[15vh] dark:bg-black/80">
            <PublicTopBar />
          </header>

          {/*=================== MAIN =======================*/}
          <main className="h-full">
            <Outlet />
          </main>

          {/*=================== FOOTER =======================*/}

          <Footer />
        </div>
      </div>
    </>
  );
};

export default PublicLayout;
