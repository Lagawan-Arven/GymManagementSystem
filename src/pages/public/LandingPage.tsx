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
                  onClick={() => navigate("/register")}
                  className="mt-10 rounded-xl border border-red-500 px-2 py-1 text-[20px] font-bold hover:text-red-500 md:text-[24px] lg:text-[30px]"
                >
                  <span className="text-red-500 hover:text-white">Get</span>{" "}
                  Started
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*=========== SECTIONS =============== */}
        <div className="bg-white font-sans text-gray-900 antialiased transition-colors duration-300 dark:bg-black dark:text-white">
          {/* 1. What is this all about? (Features) */}
          <section className="mx-auto max-w-7xl px-6 py-24">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                Everything Your Gym Needs
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                Built specifically for independent gym owners. Replace the
                chaotic notebooks, loose receipts, and messy sign-in sheets with
                one simple system.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Feature Card 1 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-red-500 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-red-500">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-500/10">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Member Profiles
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Know exactly who is walking through your doors. Access contact
                  info, membership status, and history in one click.
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-red-500 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-red-500">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-500/10">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Payment Tracking
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Never guess who owes you money. Track cash or transfer
                  payments, log dues, and instantly see who is falling behind on
                  their membership.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-red-500 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-red-500">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-500/10">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Automated Logs
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ditch the paper sign-in sheet. Automatically track daily
                  attendance and gym usage without manual data entry.
                </p>
              </div>

              {/* Feature Card 4 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-red-500 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-red-500">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-500/10">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Simple Analytics
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  See your real numbers. Visual dashboards show you active
                  members, total revenue, and peak hours so you can make smarter
                  decisions.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Why should we use this? (Value Prop) */}
          <section className="border-y border-gray-200 bg-gray-50 px-6 py-24 transition-colors duration-300 dark:border-neutral-900 dark:bg-neutral-950">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row">
              <div className="w-full lg:w-1/2">
                <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                  Stop Losing Money in the Notebook.
                  <br />
                  <span className="text-red-500">
                    Save Time, Effort, and Energy.
                  </span>
                </h2>
                <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                  Running a local gym is exhausting enough without the admin
                  headache. You didn't open a gym to push paper and chase people
                  for monthly dues.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
                      <span className="text-sm font-bold text-red-600 dark:text-red-500">
                        ✓
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Plug Revenue Leaks
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Unpaid dues and expired memberships cost you thousands.
                        ArvFit flags expired accounts instantly before they even
                        hit the gym floor.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
                      <span className="text-sm font-bold text-red-600 dark:text-red-500">
                        ✓
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        End the Admin Burnout
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Reclaim hours spent counting cash, updating
                        spreadsheets, and digging through records. Do in seconds
                        what used to take hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
                      <span className="text-sm font-bold text-red-600 dark:text-red-500">
                        ✓
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Professionalize Your Front Desk
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Give your members a fast, modern check-in experience. No
                        more waiting in line while you search for their name on
                        a clipboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-colors duration-300 lg:w-1/2 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-2xl">
                {/* Placeholder for an app screenshot or dashboard image showing the simple UI */}
                <span className="font-mono text-sm text-gray-400 dark:text-neutral-600">
                  [ ArvFit Dashboard / Check-in Screen ]
                </span>
              </div>
            </div>
          </section>

          {/* 3. How to get started? (Process) */}
          <section className="mx-auto max-w-7xl px-6 py-24">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                No Heavy Learning Required
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                We know you're busy.{" "}
                <span className="text-black dark:text-white">
                  Arv<span className="text-red-500">Fit</span>
                </span>{" "}
                is designed to be set up in minutes, not days.
              </p>
            </div>

            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Connecting line for desktop */}
              <div className="absolute top-1/2 right-[15%] left-[15%] -z-10 hidden h-0.5 bg-gray-200 md:block dark:bg-neutral-800"></div>

              {/* Step 1 */}
              <div className="relative flex flex-col items-center bg-white px-4 text-center transition-colors duration-300 dark:bg-black">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500 bg-white text-2xl font-bold text-gray-900 shadow-[0_0_10px_rgba(239,68,68,0.15)] dark:bg-neutral-900 dark:text-white dark:shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Claim Your Gym
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sign up and enter your basic gym details. Takes less than 2
                  minutes.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center bg-white px-4 text-center transition-colors duration-300 dark:bg-black">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500 bg-white text-2xl font-bold text-gray-900 shadow-[0_0_10px_rgba(239,68,68,0.15)] dark:bg-neutral-900 dark:text-white dark:shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Add Your Members
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Log your current members into the system as they walk in, or
                  upload a list if you have one.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center bg-white px-4 text-center transition-colors duration-300 dark:bg-black">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500 bg-white text-2xl font-bold text-gray-900 shadow-[0_0_10px_rgba(239,68,68,0.15)] dark:bg-neutral-900 dark:text-white dark:shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Get Back on the Floor
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Let{" "}
                  <span className="text-black dark:text-white">
                    Arv<span className="text-red-500">Fit</span>
                  </span>{" "}
                  handle the tracking while you focus on training your clients.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Call to Action */}
          <section className="bg-lineart-to-b border-t border-gray-200 from-white to-gray-50 px-6 py-24 text-center transition-colors duration-300 dark:border-neutral-900 dark:from-black dark:to-neutral-950">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
                Ready to bring order to your gym?
              </h2>
              <p className="mb-10 text-xl text-gray-600 dark:text-gray-400">
                Stop stressing over missing payments and messy paperwork. Try{" "}
                <span className="text-black dark:text-white">
                  Arv<span className="text-red-500">Fit</span>
                </span>{" "}
                today.
              </p>
              <button className="group mx-auto flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-10 py-4 text-lg font-semibold text-gray-900 shadow-sm transition-all duration-300 hover:border-red-500 dark:border-neutral-700 dark:bg-transparent dark:text-white dark:shadow-none dark:hover:border-red-500">
                <span className="text-red-600 transition-colors group-hover:text-red-500 dark:text-red-500 dark:group-hover:text-red-400">
                  Get
                </span>{" "}
                Started
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
