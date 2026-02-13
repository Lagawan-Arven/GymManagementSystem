import React from "react";
import { Award, Target, HeartHandshake } from "lucide-react";
import { useAuthPage } from "../../context/AuthPageContext";

const About = () => {
  const { setSignupOpen } = useAuthPage();
  return (
    <main>
      {/* HERO */}
      <div className="relative h-screen">
        <img
          src="src/assets/workoutcover.jpg"
          alt=""
          className="absolute object-fill inset-0 h-full w-full"
        />
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-white/70 dark:bg-black/80" />

        <div className="absolute inset-0 text-center content-center px-10 z-1">
          <h1 className="text-4xl font-bold xl:text-5xl">
            Fit<span className="text-red-600">Gym</span>
          </h1>
          <p className="text-sm mt-4 text-neutral-600 dark:text-neutral-300 xl:text-2xl">
            {" "}
            We’re more than just a gym — we’re a community built around
            strength, discipline, and sustainable progress.
          </p>
        </div>
      </div>

      {/* STORY */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Our Story</h2>
            <p className="mt-6 text-neutral-600 dark:text-neutral-400">
              FitGym was founded with a simple mission: to create a training
              space where anyone — beginner or athlete — can improve their
              health, confidence, and performance.
            </p>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              We combine modern equipment, experienced coaches, and
              science-based programs to help our members achieve results that
              last.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <img
              src="\workout\workoutcover.jpg" // replace
              alt="Gym training"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-neutral-50 dark:bg-neutral-900 px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">What We Stand For</h2>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
              <Target className="h-10 w-10 text-red-500" />
              <h3 className="mt-4 text-xl font-semibold">
                Purpose-Driven Training
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Every workout has a reason. No fluff. Just effective training.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
              <HeartHandshake className="h-10 w-10 text-red-500" />
              <h3 className="mt-4 text-xl font-semibold">
                Supportive Community
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Train in an environment that motivates, supports, and inspires.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
              <Award className="h-10 w-10 text-red-500" />
              <h3 className="mt-4 text-xl font-semibold">Proven Results</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Our methods are tested, refined, and trusted by our members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-red-600 to-red-500 p-12 text-center text-white">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to Train With Us?
          </h2>
          <p className="mt-4 text-red-100">
            Join FitGym today and start building the strongest version of
            yourself.
          </p>
          <button
            onClick={() => setSignupOpen(true)}
            className="mt-8 rounded-xl bg-black px-10 py-4 text-lg font-semibold hover:bg-neutral-900 transition"
          >
            Become a Member
          </button>
        </div>
      </section>
    </main>
  );
};

export default About;
