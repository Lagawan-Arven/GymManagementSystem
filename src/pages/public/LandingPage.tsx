import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full ">
      {/*=========== MAIN HERO =============== */}
      <div className="relative h-screen text-center">
        {/*----------------- BG IMAGE----------------- */}
        <img
          src="/src/assets/workoutcover.jpg"
          alt="hero cover"
          className="absolute inset-0 object-fill h-full w-full"
        />
        {/*----------------- OVERLAY ----------------- */}
        <div className="absolute inset-0 bg-white/70 dark:bg-black/80" />

        {/*----------------- MAIN CONTENT----------------- */}
        <div className="absolute inset-0 z-1 content-center px-2">
          <div className="flex flex-col gap-2">
            {/* HEADER */}
            <h1 className="text-[20px] md:text-[24px] lg:text-[35px] font-bold">
              The Gym Management System That Actually Keeps Up.{" "}
            </h1>
            {/* SUB HEADER */}
            <p className="text-[18px] md:text-[20px] lg:text-[30px] font-semibold">
              Clean, fast, and simple.
            </p>
            {/* FADED SUB HEADER  */}
            <p className="text-[12px] md:text-[16px] lg:text-[20px] lg:font-semibold text-neutral-600 dark:text-neutral-400">
              Stop chasing paper logs and expired memberships.
            </p>
            {/* FADED SUB HEADER  */}
            <p className="text-[12px] md:text-[16px] lg:text-[20px] lg:font-semibold text-neutral-600 dark:text-neutral-400">
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
                className="mt-10 px-2 py-1 text-[20px] md:text-[24px] lg:text-[30px] font-bold border rounded-xl border-red-500 hover:text-red-500"
              >
                <span className="text-red-500 hover:text-white">Get</span>{" "}
                Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
