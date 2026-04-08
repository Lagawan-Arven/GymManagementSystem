const PricingPage = () => {
  return (
    <div className="min-h-screen bg-white pt-[10vh] pb-24 font-sans text-gray-900 antialiased transition-colors duration-300 md:pt-[15vh] dark:bg-black dark:text-white">
      {/* Promo Banner */}
      <div className="bg-red-600 px-4 py-3 text-center text-sm font-medium tracking-wide text-white dark:bg-red-600">
        🚀 <span className="font-bold">Early Bird Offer:</span> The first 5 gyms
        to sign up get a 20% discount for their entire first year!
      </div>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
          Fair Pricing for <span className="text-red-500">Your Gym</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
          Start with a{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-week free trial
          </span>
          . Choose the plan that fits your current size and scale as you grow.
        </p>
      </section>

      {/* Pricing Options Container */}
      <div className="mx-auto max-w-7xl space-y-16 px-6">
        {/* Option 1: Monthly Subscription */}
        <div>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Option 1: Flat Monthly Subscription
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Predictable pricing based on your active member count.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Tier 1 */}
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-colors duration-300 hover:border-red-500 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-red-500">
              <h3 className="mb-2 text-lg font-semibold text-gray-600 dark:text-gray-400">
                Starter
              </h3>
              <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                ₱500
                <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                  /mo
                </span>
              </div>
              <p className="mb-6 text-sm font-medium text-red-600 dark:text-red-400">
                ₱400/mo for first 5 gyms
              </p>
              <div className="mt-auto border-t border-gray-100 pt-6 dark:border-neutral-800">
                <p className="font-medium text-gray-600 dark:text-gray-300">
                  Up to 50 members
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                  All standard features included
                </p>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-colors duration-300 hover:border-red-500 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-red-500">
              <div className="absolute top-0 right-8 -translate-y-1/2 transform">
                <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase dark:bg-white dark:text-black">
                  Popular
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-600 dark:text-gray-400">
                Growing
              </h3>
              <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                ₱1,000
                <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                  /mo
                </span>
              </div>
              <p className="mb-6 text-sm font-medium text-red-600 dark:text-red-400">
                ₱800/mo for first 5 gyms
              </p>
              <div className="mt-auto border-t border-gray-100 pt-6 dark:border-neutral-800">
                <p className="font-medium text-gray-600 dark:text-gray-300">
                  51 - 100 members
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                  All standard features included
                </p>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-colors duration-300 hover:border-red-500 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-red-500">
              <h3 className="mb-2 text-lg font-semibold text-gray-600 dark:text-gray-400">
                Established
              </h3>
              <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                ₱1,500
                <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                  /mo
                </span>
              </div>
              <p className="mb-6 text-sm font-medium text-red-600 dark:text-red-400">
                ₱1,200/mo for first 5 gyms
              </p>
              <div className="mt-auto border-t border-gray-100 pt-6 dark:border-neutral-800">
                <p className="font-medium text-gray-600 dark:text-gray-300">
                  101 - 150 members
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                  All standard features included
                </p>
              </div>
            </div>

            {/* Tier 4 */}
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-colors duration-300 hover:border-red-500 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-red-500">
              <h3 className="mb-2 text-lg font-semibold text-gray-600 dark:text-gray-400">
                Pro
              </h3>
              <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                ₱2,000
                <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                  /mo
                </span>
              </div>
              <p className="mb-6 text-sm font-medium text-red-600 dark:text-red-400">
                ₱1,600/mo for first 5 gyms
              </p>
              <div className="mt-auto border-t border-gray-100 pt-6 dark:border-neutral-800">
                <p className="font-medium text-gray-600 dark:text-gray-300">
                  150+ members
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                  All standard features included
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Option 2: Commission Based */}
        <div>
          <div className="flex flex-col items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-sm transition-colors duration-300 md:flex-row lg:p-10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none">
            <div className="mb-6 w-full md:mb-0 md:w-2/3 md:pr-8">
              <div className="mb-4 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600 dark:bg-red-500/10 dark:text-red-500">
                Alternative Plan
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Option 2: Pay-As-You-Go
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Don't want to commit to a monthly flat fee? Use the software for
                free and only pay a small commission when you process payments
                through the system.
              </p>
            </div>
            <div className="w-full border-t border-gray-200 pt-6 text-left md:w-1/3 md:border-t-0 md:border-l md:pt-0 md:pl-8 md:text-right dark:border-neutral-800">
              <div className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                5%
              </div>
              <p className="font-medium text-gray-600 dark:text-gray-400">
                per transaction
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                ₱0 base monthly fee
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 px-6 text-center">
        <button className="rounded-lg bg-red-600 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-red-600/20 transition-colors duration-300 hover:bg-red-700">
          Start Your 1-Week Free Trial
        </button>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Get set up in minutes. Cancel anytime.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
