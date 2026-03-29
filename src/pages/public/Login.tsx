import { useState, useEffect, type SetStateAction } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { fetchOwners } from "../../services/api/Service";

import { RiAdminLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

interface Owner {
  id: string;
  name: string;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [owners, setOwners] = useState<Owner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);

  const [showQueryInput, setShowQueryInput] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredGyms, setFilteredGyms] = useState<Owner[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const getOwners = async () => {
      try {
        const response = await fetchOwners();
        setOwners(response.owners);
        setLoading(false);
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
      <div className="h-full flex justify-center">
        <div className="px-5 md:px-5 w-full max-w-md content-center ">
          {/* Gym query */}
          {showQueryInput && (
            <div className="relative h-40 md:h-30 mb-5">
              <MdCancel
                onClick={() => {
                  setShowQueryInput(false);
                  setQuery("");
                  setSelectedOwner(null);
                }}
                className="absolute right-0"
              />
              <div className="flex gap-2 items-center justify-center">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search for your gym"
                  value={query}
                  onChange={handleChange}
                  className="w-50 px-2 py-1 rounded-xl border border-neutral-500"
                />
              </div>
              {loading && <p>Loading...</p>}
              {!loading && showDropdown && filteredGyms.length > 0 && (
                <ul className="w-55 justify-self-center px-2 py-1 rounded-b-xl border-x border-b border-neutral-500">
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
              <span className="text-red-600 dark:text-red-500 ">Back</span>
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
              try {
                login({
                  owner_id: selectedOwner ? selectedOwner.id : null,
                  username,
                  password,
                  role: selectedOwner ? "admin" : "owner",
                });
              } catch (err) {
                console.error("Error whule owner login: ", err);
              }

              setUsername("");
              setPassword("");
            }}
          >
            {/* Email or Username Input */}

            <input
              type="text"
              placeholder="Email or Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2 text-neutral-900  focus:border-red-600 focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-red-500"
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
                className="py-2 px-4 rounded-xl bg-red-600 text-black hover:text-white dark:bg-red-500 "
              >
                Submit
              </button>
            </div>
          </form>

          {/* Login as an admin/staff */}
          <button
            onClick={() => setShowQueryInput(true)}
            className="flex mt-5 w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 font-semibold text-white transition hover:bg-red-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-red-500"
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
    </>
  );
};

export default Login;
