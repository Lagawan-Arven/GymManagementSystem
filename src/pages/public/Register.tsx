import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="flex h-full items-center justify-center">
        <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-neutral-900">
          {/*============ Header =============*/}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              First Time{" "}
              <span className="text-red-600 dark:text-red-500">Here?</span>
            </h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Register your gym to continue{" "}
            </p>
          </div>

          {/*=========== Register Form ===============*/}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form submitted");

              if (user.password !== confirmPassword) {
                toast.error("Password did not match");
                return;
              }

              register(user);
            }}
          >
            {/* Gym name */}
            <input
              type="name"
              placeholder="Name of your gym"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-white"
              required
            />

            {/* Username */}
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-white"
              required
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-white"
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-white"
              required
            />

            {/*Confirm Password */}
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-white"
              required
            />

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-xl bg-red-600 px-4 py-2 text-black hover:text-white dark:bg-red-500"
              >
                Submit
              </button>
            </div>
          </form>
          {/* Footer */}
          <div className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-neutral-900 hover:underline dark:text-white"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
