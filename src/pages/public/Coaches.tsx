import { Award, Star, Clock } from "lucide-react";

import { useAuthPage } from "../../context/AuthPageContext";

const coaches = [
  {
    name: "Alex Rivera",
    role: "Strength & Conditioning Coach",
    bio: "Specializes in strength development, injury prevention, and athletic performance.",
    image: "/images/coach-1.jpg", // replace
    experience: "8+ Years",
  },
  {
    name: "Maria Santos",
    role: "Fat Loss & HIIT Coach",
    bio: "Focuses on sustainable fat loss, metabolic training, and lifestyle coaching.",
    image: "/images/coach-2.jpg", // replace
    experience: "6+ Years",
  },
  {
    name: "Daniel Kim",
    role: "Mobility & Conditioning Coach",
    bio: "Helps members improve movement quality, endurance, and overall health.",
    image: "/images/coach-3.jpg", // replace
    experience: "7+ Years",
  },
];

const Coaches = () => {
  const { setSignupOpen } = useAuthPage();
  return (
    <main>
      {" "}
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
            Meet Our <span className="text-red-600">Coaches</span>
          </h1>
          <p className="text-sm mt-4 text-neutral-600 dark:text-neutral-300 xl:text-2xl">
            {" "}
            Certified professionals dedicated to your progress and success.
          </p>
        </div>
      </div>
      {/* COACHES GRID */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">{coach.name}</h3>
                <p className="mt-1 text-sm text-red-500 font-medium">
                  {coach.role}
                </p>

                <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                  {coach.bio}
                </p>

                <div className="mt-6 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-red-500" />
                    {coach.experience}
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-red-500" />
                    Top Rated
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* WHY OUR COACHES */}
      <section className="bg-neutral-50 dark:bg-neutral-900 px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Why Train With Our Coaches?
          </h2>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Award,
                title: "Certified Experts",
                text: "Professionally trained and continuously educated.",
              },
              {
                icon: Clock,
                title: "Personalized Approach",
                text: "Programs tailored to your goals and schedule.",
              },
              {
                icon: Star,
                title: "Proven Results",
                text: "Trusted by hundreds of satisfied members.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950"
              >
                <item.icon className="h-10 w-10 text-red-500" />
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-red-600 to-red-500 p-12 text-center text-white">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Train With the Best
          </h2>
          <p className="mt-4 text-red-100">
            Book a session with one of our expert coaches today.
          </p>
          <button
            onClick={() => setSignupOpen(true)}
            className="mt-8 rounded-xl bg-black px-10 py-4 text-lg font-semibold hover:bg-neutral-900 transition"
          >
            Book a Coach
          </button>
        </div>
      </section>
    </main>
  );
};

export default Coaches;
