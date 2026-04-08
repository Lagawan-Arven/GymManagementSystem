import { useState, useEffect, type SetStateAction } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { fetchOwners, getRoot } from "../../api/Service";

import { RiAdminLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

interface Owner {
  id: string;
  name: string;
}

const Login = () => {
  const [apiLoading, setApiLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const api_init = async () => {
      try {
        const res = await getRoot();
        if (res.status === "ok") {
          setApiLoading(false);
        }
      } catch (err) {
        console.error("Error while initializing api: ", err);
      }
    };
    api_init();
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [owners, setOwners] = useState<Owner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [gymLoading, setGymLoading] = useState(true);

  const [showQueryInput, setShowQueryInput] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredGyms, setFilteredGyms] = useState<Owner[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const getOwners = async () => {
      try {
        const response = await fetchOwners();
        setOwners(response.owners);
        setGymLoading(false);
      } catch (error) {
        console.error("Error while fetching owners", error);
      }
    };
    getOwners();
  }, []);

  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const suggestions = owners?.filter((owner) =>
        owner.name.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredGyms(suggestions);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelect = (item: SetStateAction<Owner | null>) => {
    setQuery(item ? item.name : "");
    setSelectedOwner(item ? item : null);
    setShowDropdown(false);
  };

  return (
    <>
      {apiLoading || authLoading ? (
        <div className="h-full content-center text-center">
          <p className="text-[18px] font-semibold md:text-[20px] lg:text-[24px]">
            Loading...
          </p>
        </div>
      ) : (
        <div className="flex h-full justify-center">
          <div className="w-full max-w-md content-center px-5 md:px-5">
            {/* Gym query */}
            {showQueryInput && (
              <div className="relative mb-5 h-40 md:h-30">
                <MdCancel
                  onClick={() => {
                    setShowQueryInput(false);
                    setQuery("");
                    setSelectedOwner(null);
                  }}
                  className="absolute right-0"
                />
                <div className="flex items-center justify-center gap-2">
                  <FaSearch />
                  <input
                    type="text"
                    placeholder="Search for your gym"
                    value={query}
                    onChange={handleChange}
                    className="w-50 rounded-xl border border-neutral-500 px-2 py-1"
                  />
                </div>
                {gymLoading && <p>Loading...</p>}
                {!gymLoading && showDropdown && filteredGyms.length > 0 && (
                  <ul className="w-55 justify-self-center rounded-b-xl border-x border-b border-neutral-500 px-2 py-1">
                    {filteredGyms.map((gym, index) => (
                      <li key={index} onClick={() => handleSelect(gym)}>
                        {gym ? gym.name : "None"}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Header */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Welcome{" "}
                <span className="text-red-600 dark:text-red-500">Back</span>
              </h2>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Log in to continue
              </p>
            </div>

            {/* Login Form */}
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Form submitted");
                setAuthLoading(true);
                const loginUser = async () => {
                  try {
                    await login({
                      owner_id: selectedOwner ? selectedOwner.id : null,
                      username,
                      password,
                      role: selectedOwner ? "admin" : "owner",
                    });
                    setAuthLoading(false);
                    setUsername("");
                    setPassword("");
                  } catch (err) {
                    console.error("Error while owner login: ", err);
                  }
                };
                loginUser();
              }}
            >
              {/* Email or Username Input */}

              <input
                type="text"
                placeholder="Email or Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900 focus:border-red-600 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-red-500"
                required
              />

              {/* Password Input */}

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900 focus:border-red-600 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-red-500"
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

            {/* Login as an admin/staff */}
            <button
              onClick={() => setShowQueryInput(true)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 font-semibold text-white transition hover:bg-red-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-red-500"
            >
              <RiAdminLine className="h-5 w-5" />
              Log in as an Admin/Staff
            </button>

            {/* Footer */}
            <div className="mt-5 text-center text-sm text-neutral-500 dark:text-neutral-400">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-medium text-neutral-900 hover:underline dark:text-white"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
