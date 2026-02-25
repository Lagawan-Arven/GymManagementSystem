import { X, Mail } from "lucide-react";
import { useState } from "react";
import { useAuthPage } from "../../context/AuthPageContext";
import { useAuth } from "../../context/AuthContext";
import { createPortal } from "react-dom";

const Signin = () => {
  const { signinOpen, setSigninOpen, switchToSignup } = useAuthPage();
  const [emailUsername, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useAuth();

  return createPortal(
    <>
      {signinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {/* Modal */}
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-neutral-900">
            {/* Close Button */}
            <button
              onClick={() => {
                setSigninOpen(!signinOpen);
              }}
              className="absolute right-4 top-4 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            >
              <X className="h-5 w-5" />
            </button>
            {/* Header */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Welcome{" "}
                <span className="text-red-600 dark:text-red-500 ">Back</span>
              </h2>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Sign in to continue your fitness journey
              </p>
            </div>
            {/* Email Sign In */}
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                signin({ emailUsername, password });
              }}
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Email or Username
                </label>
                <input
                  type="username"
                  placeholder="your email or username"
                  value={emailUsername}
                  onChange={(e) => setEmailUsername(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900  focus:border-red-600 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900 focus:border-red-600 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-red-500"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-red-600 text-black hover:text-white dark:bg-red-500 "
                >
                  Submit
                </button>
              </div>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 font-semibold text-white transition hover:bg-red-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-red-500">
                <Mail className="h-4 w-4" />
                Sign In with Email
              </button>
            </form>
            {/* Footer */}
            <div className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
              Don’t have an account?{" "}
              <button
                onClick={switchToSignup}
                className="font-medium text-neutral-900 hover:underline dark:text-white"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body,
  );
};

export default Signin;
