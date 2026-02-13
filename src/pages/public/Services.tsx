import {
  Dumbbell,
  Flame,
  Users,
  PersonStanding,
  CalendarCheck,
  HeartPulse,
} from "lucide-react";

import { useAuthPage } from "../../context/AuthPageContext";

const services = [
  {
    icon: Dumbbell,
    title: "Strength Training",
    description:
      "Progressive strength programs using free weights and machines to build real power.",
    image: "/images/service-strength.jpg", // replace
  },
  {
    icon: Flame,
    title: "Fat Loss Programs",
    description:
      "High-intensity and metabolic training designed to burn fat efficiently.",
    image: "/images/service-fatloss.jpg", // replace
  },
  {
    icon: Users,
    title: "Group Classes",
    description:
      "High-energy group workouts that keep you motivated and accountable.",
    image: "/images/service-group.jpg", // replace
  },
  {
    icon: PersonStanding,
    title: "Personal Training",
    description:
      "One-on-one coaching tailored to your goals, schedule, and fitness level.",
    image: "/images/service-pt.jpg", // replace
  },
  {
    icon: CalendarCheck,
    title: "Flexible Memberships",
    description:
      "Choose a plan that fits your lifestyle with easy booking and scheduling.",
    image: "/images/service-membership.jpg", // replace
  },
  {
    icon: HeartPulse,
    title: "Health & Conditioning",
    description:
      "Improve mobility, endurance, and overall health with balanced training.",
    image: "/images/service-conditioning.jpg", // replace
  },
];

const Services = () => {
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
            Our <span className="text-red-600">Services</span>
          </h1>
          <p className="text-sm mt-4 text-neutral-600 dark:text-neutral-300 xl:text-2xl">
            {" "}
            Training programs designed for every body and every goal.
          </p>
        </div>
      </div>

      {/* SERVICES GRID */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <service.icon className="h-10 w-10 text-red-500" />
                <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-neutral-50 dark:bg-neutral-900 px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Why Choose Fit<span className="text-red-600">Gym</span>?
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            More than workouts — we deliver results.
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Expert Coaches",
                text: "Certified trainers who care about your progress.",
              },
              {
                title: "Modern Equipment",
                text: "Top-tier machines and free weights for all levels.",
              },
              {
                title: "Smart Booking",
                text: "Train on your schedule with easy reservations.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
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
            Find the Right Program for You
          </h2>
          <p className="mt-4 text-red-100">
            Whether you’re just starting or leveling up, we’ve got you covered.
          </p>
          <button
            onClick={() => setSignupOpen(true)}
            className="mt-8 rounded-xl bg-black px-10 py-4 text-lg font-semibold hover:bg-neutral-900 transition"
          >
            View Memberships
          </button>
        </div>
      </section>
    </main>
  );
};

export default Services;
