import React from "react";
import { useState } from "react";
import { Dumbbell, Flame, Users, CalendarCheck } from "lucide-react";
import { useAuthPage } from "../../context/AuthPageContext";

const features = [
  {
    icon: Dumbbell,
    title: "Strength Training",
    description: "Build real strength with guided programs and pro equipment.",
  },
  {
    icon: Flame,
    title: "Fat Loss Programs",
    description: "Science-backed workouts to burn fat and boost endurance.",
  },
  {
    icon: Users,
    title: "Group Classes",
    description: "Train harder with high-energy group sessions.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    description: "Reserve workouts and classes in just a few clicks.",
  },
];

const carouselImages = [
  "src/assets/workout1.jpg",
  "src/assets/workout2.jpg",
  "src/assets/workout3.jpg",
  "src/assets/workout4.jpg",
  "src/assets/workout5.jpg",
  "src/assets/workout6.jpg",
  "src/assets/workout7.jpg",
];

const Landing = () => {
  const [current, setCurrent] = useState(0);
  const { setSignupOpen } = useAuthPage();

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));

  return (
    <main className="">
      {/* MAIN HERO  */}
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
            Train Hard. <span className="text-red-600">Stay Strong.</span>
          </h1>
          <p className="text-sm mt-4 text-neutral-600 dark:text-neutral-300 xl:text-2xl">
            {" "}
            Your transformation starts here. Modern equipment, expert coaches,
            and flexible memberships designed for real results.
          </p>
        </div>
      </div>

      {/* FEATURES */}
      <section className="content-center py-10 xl:px-20">
        <div className="text-center my-8 xl:my-10">
          <h2 className="text-2xl font-bold xl:text-3xl">Why Train With Us?</h2>
          <p className="xl:text-lg">
            Everything you need to reach peak performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 md:gap-y-10 lg:grid-cols-4 xl:gap-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border rounded-3xl w-[13rem] h-[13rem] mx-auto my-5 p-5 bg-gray-200 dark:bg-gray-900 xl:w-[17rem] xl:h-[13rem]"
            >
              <feature.icon
                color="red"
                className="w-[2rem] h-[2rem] xl:w-[2.5rem] xl:h-[2.5rem]"
              />
              <h3 className="font-bold mt-1 xl:text-xl xl:mt-2">
                {feature.title}
              </h3>
              <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-400 xl:mt-2 xl:text-">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* IMAGE CAROUSEL*/}
      <section className="px-5 py-10  content-center  md:px-10">
        <div className="h-[13rem] w-[17rem] relative overflow-hidden inset-0 mx-auto hover:text-red-600 rounded-4xl border border-red-500 hover:shadow-md hover:shadow-red-500 lg:h-[32rem] lg:w-[60rem]">
          <img
            src={carouselImages[current]}
            alt="Image Carousel"
            className="object-cover inset-0 h-full w-full"
          />
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2  text-7xl"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2  text-7xl"
          >
            ›
          </button>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="content-center bg-red-500 p-5 dark:bg-red-800 xl:py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold xl:text-4xl">
            Start Your Fitness Journey Today
          </h2>
          <p className="my-2 xl:text-xl">
            No Contracts. No Excuses. Just Result.
          </p>
          <button
            onClick={() => setSignupOpen(true)}
            className="bg-white text-black p-2 my-2 rounded-2xl h-[3rem] w-[8rem] dark:bg-black dark:text-white xl:h-[5rem] xl:w-[10rem] xl:text-2xl xl:font-bold xl:rounded-4xl xl:py-5 xl:my-5"
          >
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
};

export default Landing;
