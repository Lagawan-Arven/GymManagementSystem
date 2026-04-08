import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 pt-16 pb-8 font-sans text-gray-600 antialiased transition-colors duration-300 dark:border-neutral-900 dark:bg-black dark:text-gray-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand & Tagline */}
          <div className="md:col-span-1">
            <div className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Arv<span className="text-red-500">Fit</span>
            </div>
            <p className="mb-6 max-w-xs text-sm text-gray-500 dark:text-gray-400">
              The gym management system that actually keeps up. Built
              specifically to help local and independent gyms save time, effort,
              and money.
            </p>
            <p className="text-sm font-medium">
              Based in Iligan City, Philippines
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-sm transition-colors hover:text-red-500 dark:hover:text-red-400"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm transition-colors hover:text-red-500 dark:hover:text-red-400"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-sm transition-colors hover:text-red-500 dark:hover:text-red-400"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm transition-colors hover:text-red-500 dark:hover:text-red-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Connect */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Connect
            </h3>
            <div className="mb-6 flex space-x-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/people/Code-with-Arvs/61586474811489/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:border-red-500 hover:text-red-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-400 dark:hover:border-red-500 dark:hover:text-red-500"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/ItsMeArven"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:border-red-500 hover:text-red-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-400 dark:hover:border-red-500 dark:hover:text-red-500"
                aria-label="X"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/arven-lagawan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:border-red-500 hover:text-red-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-400 dark:hover:border-red-500 dark:hover:text-red-500"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href="mailto:arvenlagawan0731@gmail.com"
                className="text-sm transition-colors hover:text-red-500 dark:hover:text-red-400"
              >
                arvenlagawan0731@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row dark:border-neutral-800">
          <p className="text-sm">
            © {currentYear} ArvFit. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="transition-colors hover:text-red-500 dark:hover:text-red-400"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition-colors hover:text-red-500 dark:hover:text-red-400"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
