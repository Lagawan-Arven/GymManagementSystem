import { useNavigate } from "react-router-dom";

import coverImage from "../../assets/workoutcover.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-full">
        {/*=========== MAIN HERO =============== */}
        <div className="relative h-screen text-center">
          {/*----------------- BG IMAGE----------------- */}
          <img
            src={coverImage}
            alt="hero cover"
            className="absolute inset-0 h-full w-full object-fill"
          />
          {/*----------------- OVERLAY ----------------- */}
          <div className="absolute inset-0 bg-white/70 dark:bg-black/80" />
          {/*----------------- MAIN CONTENT----------------- */}
          <div className="absolute inset-0 z-1 content-center px-2">
            <div className="flex flex-col gap-2">
              {/* HEADER */}
              <h1 className="text-[20px] font-bold md:text-[24px] lg:text-[35px]">
                The Gym Management System That Actually Keeps Up.{" "}
              </h1>
              {/* SUB HEADER */}
              <p className="text-[18px] font-semibold md:text-[20px] lg:text-[30px]">
                Clean, fast, and simple.
              </p>
              {/* FADED SUB HEADER  */}
              <p className="text-[12px] text-neutral-600 md:text-[16px] lg:text-[20px] lg:font-semibold dark:text-neutral-400">
                Stop chasing paper logs and expired memberships.
              </p>
              {/* FADED SUB HEADER  */}
              <p className="text-[12px] text-neutral-600 md:text-[16px] lg:text-[20px] lg:font-semibold dark:text-neutral-400">
                {" "}
                Get back to the floor while{" "}
                <span className="font-bold dark:text-white">
                  Arv<span className="text-red-500">Fit</span>
                </span>{" "}
                handles the rest.
              </p>
              <div>
                <button
                  onClick={() => navigate("/login")}
                  className="mt-10 rounded-xl border border-red-500 px-2 py-1 text-[20px] font-bold hover:text-red-500 md:text-[24px] lg:text-[30px]"
                >
                  <span className="text-red-500 hover:text-white">Get</span>{" "}
                  Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
