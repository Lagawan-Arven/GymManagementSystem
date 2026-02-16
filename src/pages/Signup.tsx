import { X, Mail } from "lucide-react";
import { useState } from "react";
import { useAuthPage } from "../context/AuthPageContext";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signupOpen, setSignupOpen, switchToSignin } = useAuthPage();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();

  return (
    <>
      {signupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {/* Modal */}
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-neutral-900">
            {/* Close Button */}
            <button
              onClick={() => {
                setSignupOpen(!signupOpen);
              }}
              className="absolute right-4 top-4 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            >
              <X className="h-5 w-5" />
            </button>
            {/* Header */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                First Time{" "}
                <span className="text-red-600 dark:text-red-500 ">Here?</span>
              </h2>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Sign up to continue your fitness journey
              </p>
            </div>
            {/* Email Sign In */}
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                signup({ name, age, sex, email, password });
                switchToSignin();
              }}
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Name
                </label>
                <input
                  type="name"
                  placeholder="your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-white"
                />
              </div>

              <div className="flex">
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Age
                  </label>
                  <input
                    type="age"
                    placeholder="your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-[90%] rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Sex
                  </label>
                  <input
                    type="sex"
                    placeholder="your sex"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-white"
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

              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
                <Mail className="h-4 w-4" />
                Sign Up with Email
              </button>
            </form>
            {/* Footer */}
            <div className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
              Already have an account?{" "}
              <button
                onClick={switchToSignin}
                className="font-medium text-neutral-900 hover:underline dark:text-white"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
