import { Outlet } from "react-router-dom";

import PublicTopBar from "../navigation/PublicTopBar";

const PublicLayout = () => {
  return (
    <>
      <div className=" bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
        <div className="relative">
          {/*=================== HEADER =======================*/}
          <header className="h-[10vh] w-full md:h-[15vh] fixed z-10 bg-white/70 dark:bg-black/80">
            <PublicTopBar />
          </header>

          {/*=================== MAIN =======================*/}
          <main className="">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default PublicLayout;
