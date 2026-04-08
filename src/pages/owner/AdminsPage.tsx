import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { showSuccessToast } from "../../components/util";
import { addAdmin, fetchAdmins } from "../../api/Service";
import type { AdminPayload } from "../../schemas";

import { useFetchAdmins, useAddAdmin } from "../../hooks/useAdmin";

import type { IconType } from "react-icons";
import { MdAdminPanelSettings } from "react-icons/md";
import { TbSum } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

interface Admin {
  id: string;
  name: string;
  username: string;
  email: string;
  added_at: string;
  updated_at: string;
  members: Member[];
  sessions: Session[];
}

interface Member {
  isActive: boolean;
}

interface Session {
  type: string;
}

interface CardProp {
  label: string;
  text?: string;
  value: string | number;
  icon?: IconType;
  iconStyle?: string;
}

const Card = ({ label, text, value, icon: Icon, iconStyle }: CardProp) => {
  return (
    <div className="text-center">
      <p className="flex items-center justify-center gap-1 text-[14px] md:text-[18px] lg:text-[20px]">
        {Icon && <Icon className={iconStyle} />}
        {text} <span>{value}</span>{" "}
      </p>
      <p className="text-[12px] text-neutral-500 md:text-[14px] lg:text-[16px]">
        {label}
      </p>
    </div>
  );
};

const AdminsPage = () => {
  const { user } = useAuth();

  const [showAdminForm, setShowAdminForm] = useState(false);
  const [adminForm, setAdminForm] = useState<AdminPayload>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <div className="h-full w-full px-2 md:px-5">
        {/*=================== HEADER ========================= */}
        <header className="flex gap-5 border-b border-b-neutral-500 pb-2">
          {/* Title */}
          <section className="flex items-center gap-2 text-red-500">
            <MdAdminPanelSettings className="size-6 md:size-7 lg:size-8" />
            <h1 className="text-[18px] font-bold md:text-[22px] lg:text-2xl">
              Admins
            </h1>
          </section>
        </header>

        {/*===================== MAIN ==================== */}
        <main className="flex flex-col gap-3 pt-2 md:flex-row md:gap-2">
          {/*====== Admin List Section ========= */}
          <section className="md:w-[40vw]">
            {/*----------- Section Content ---------- */}
            <div className="h-[20vh] w-full rounded-xl bg-neutral-300 px-2 py-2 md:h-[75vh] md:px-5 dark:bg-neutral-800">
              {loading && (
                <div className="h-[10vh] content-center text-center md:h-[60vh]">
                  <p className="text-[18px] font-semibold md:text-[20px] lg:text-[24px]">
                    Loading...
                  </p>
                </div>
              )}
              {/*WHAT TO SHOW IF THERE IS NO DATA */}
              {!showData ? (
                <div className="h-[10vh] content-center text-center md:h-[60vh]">
                  <p className="text-[18px] font-semibold md:text-[20px] lg:text-[24px]">
                    No data to show
                  </p>
                </div>
              ) : (
                <div className="flex h-[10vh] flex-col gap-2 overflow-auto md:h-[60vh]">
                  {adminList.map((admin, index) => (
                    <div
                      onClick={() => {
                        setSelectedAdmin(admin);
                      }}
                      key={index}
                      className="rounded-xl bg-neutral-200 px-2 py-1 md:px-5 md:py-2 dark:bg-neutral-900"
                    >
                      <p>
                        {index + 1} | {admin.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-center">
                <button
                  onClick={() => setShowAdminForm(true)}
                  className="mt-3 rounded-[10px] border border-neutral-500 px-2 py-1 font-semibold md:text-[20px] md:font-bold lg:text-[24px]"
                >
                  Add Admin
                </button>
              </div>
            </div>
          </section>

          {/*====== Admin Details and Form Section ========= */}
          <section className="md:flex-1">
            {/*----------- Admin Details ---------- */}
            {!showAdminForm && (
              <div className="h-[50vh] w-full rounded-xl bg-neutral-300 md:h-[75vh] dark:bg-neutral-800">
                {/*WHAT TO SHOW IF THERE IS NO DATA */}
                {!showData ? (
                  <div className="h-full content-center text-center">
                    <p className="text-[18px] font-semibold md:text-[20px] lg:text-[24px]">
                      No data to show
                    </p>
                  </div>
                ) : (
                  <div className="h-full content-center space-y-5 px-2 py-2 md:gap-y-10 md:px-5">
                    {/* Header */}
                    <h1 className="text-center text-[18px] font-semibold md:text-xl lg:text-[24px]">
                      Admin Details
                    </h1>
                    {/* Line info*/}
                    <div className="space-y-1">
                      {/* ID*/}
                      <p className="text-[16px] md:text-[18px] lg:text-[20px]">
                        ID:{"  "}
                        {selectedAdmin && (
                          <span className="font-sans">{selectedAdmin.id}</span>
                        )}
                      </p>
                      {/* Name*/}
                      <p className="text-[16px] md:text-[18px] lg:text-[20px]">
                        Name:{"  "}
                        {selectedAdmin && (
                          <span className="font-mono">
                            {selectedAdmin.name}
                          </span>
                        )}
                      </p>
                      {/* Username*/}
                      <p className="text-[16px] md:text-[18px] lg:text-[20px]">
                        Username:{"  "}
                        {selectedAdmin && (
                          <span className="font-mono">
                            {selectedAdmin.username}
                          </span>
                        )}
                      </p>
                      {/* Email*/}
                      <p className="text-[16px] md:text-[18px] lg:text-[20px]">
                        Email:{"  "}
                        {selectedAdmin && (
                          <span className="font-mono">
                            {selectedAdmin.email}
                          </span>
                        )}
                      </p>
                      {/* Added_at*/}
                      <p className="text-[14px] md:text-[16px] lg:text-[18px]">
                        Added at:{"  "}
                        {selectedAdmin && (
                          <span className="font-mono text-[12px] text-neutral-500 md:text-[14px] lg:text-[16px]">
                            {new Date(selectedAdmin.added_at).toLocaleString(
                              undefined,
                              {
                                dateStyle: "long",
                                timeStyle: "short",
                              },
                            )}
                          </span>
                        )}
                      </p>
                      {/* Updated at*/}
                      <p className="text-[14px] md:text-[16px] lg:text-[18px]">
                        Updated at:{"   "}
                        {selectedAdmin && (
                          <span className="lg:text-[16px font-mono text-[12px] text-neutral-500 md:text-[14px]">
                            {new Date(selectedAdmin.updated_at).toLocaleString(
                              undefined,
                              {
                                dateStyle: "long",
                                timeStyle: "short",
                              },
                            )}
                          </span>
                        )}
                      </p>
                    </div>
                    {/* Content 2 => Cards*/}
                    <div className="flex flex-col gap-2 md:gap-5">
                      {/* Member Added*/}
                      <div className="flex justify-around">
                        {/* Total*/}
                        <Card
                          label="Member Added"
                          text="Total: "
                          value={
                            selectedAdmin ? selectedAdmin.members.length : 0
                          }
                          icon={TbSum}
                        />
                        {/* Active*/}
                        <Card
                          label="Active Member"
                          value={
                            selectedAdmin
                              ? selectedAdmin.members.filter(
                                  (member) => member.isActive,
                                ).length
                              : 0
                          }
                          icon={FaCircle}
                          iconStyle="text-green-500 size-2 md:size-3"
                        />
                        {/* Inactive*/}
                        <Card
                          label="Inactive Member"
                          value={
                            selectedAdmin
                              ? selectedAdmin.members.filter(
                                  (member) => !member.isActive,
                                ).length
                              : 0
                          }
                          icon={FaCircle}
                          iconStyle="text-neutral-500 size-2 md:size-3"
                        />
                      </div>
                      {/* Session Recorded*/}
                      <div className="flex justify-around">
                        {/* Total*/}
                        <Card
                          label="Session Recorded"
                          text="Total: "
                          value={
                            selectedAdmin ? selectedAdmin.sessions.length : 0
                          }
                          icon={TbSum}
                        />
                        {/* Member*/}
                        <Card
                          label="Member Session"
                          value={
                            selectedAdmin
                              ? selectedAdmin.sessions.filter(
                                  (session) => session.type === "member",
                                ).length
                              : 0
                          }
                        />
                        {/* Single*/}
                        <Card
                          label="Single Session"
                          value={
                            selectedAdmin
                              ? selectedAdmin.sessions.filter(
                                  (session) => session.type === "single",
                                ).length
                              : 0
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/*----------- Admin Form ---------- */}
            {showAdminForm && (
              <div className="relative h-[50vh] w-full space-y-5 rounded-xl bg-neutral-300 px-2 py-2 md:h-[75vh] md:content-center md:space-y-10 md:px-5 dark:bg-neutral-800">
                {/* Return Button */}
                <button
                  onClick={() => setShowAdminForm(false)}
                  className="absolute"
                >
                  <IoIosArrowBack className="size-7" />
                </button>

                {/* Header */}
                <h1 className="text-center text-[18px] font-semibold md:text-xl lg:text-[24px]">
                  Admin Form
                </h1>

                {/* The Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (adminForm.password !== confirmPassword) {
                      toast.error("Password did not match");
                      return;
                    }
                    console.log("Form submitted");
                    const addNewAdmin = async () => {
                      try {
                        const res = await addAdmin({
                          name: adminForm.name,
                          username: adminForm.username,
                          email:
                            adminForm.email === "" ? null : adminForm.email,
                          password: adminForm.password,
                        });
                        showSuccessToast(res.message);
                        setRefetch(!refetch);
                      } catch (err) {
                        console.error("Error while adding admin: ", err);
                        toast.error("Adding admin failed");
                      }
                    };
                    addNewAdmin();
                    setShowAdminForm(false);
                    setAdminForm({
                      name: "",
                      username: "",
                      email: "",
                      password: "",
                    });
                    setConfirmPassword("");
                  }}
                  className="grid gap-3 md:justify-center md:gap-5"
                >
                  {/* Name */}
                  <input
                    id="adminName"
                    type="text"
                    placeholder="Admin Name"
                    value={adminForm.name}
                    onChange={(e) =>
                      setAdminForm({ ...adminForm, name: e.target.value })
                    }
                    className="rounded-xl border border-neutral-500 px-2 py-1"
                    required
                  />

                  {/* Username */}
                  <input
                    id="adminUsername"
                    type="text"
                    placeholder="Admin Username"
                    value={adminForm.username}
                    onChange={(e) =>
                      setAdminForm({ ...adminForm, username: e.target.value })
                    }
                    className="rounded-xl border border-neutral-500 px-2 py-1"
                    required
                  />

                  {/* Email*/}
                  <input
                    id="adminEmail"
                    type="text"
                    placeholder="Admin Email"
                    value={adminForm.email ? adminForm.email : ""}
                    onChange={(e) =>
                      setAdminForm({ ...adminForm, email: e.target.value })
                    }
                    className="rounded-xl border border-neutral-500 px-2 py-1"
                  />

                  {/* Password */}
                  <input
                    id="adminPassword"
                    type="password"
                    placeholder="Password"
                    value={adminForm.password}
                    onChange={(e) =>
                      setAdminForm({ ...adminForm, password: e.target.value })
                    }
                    className="rounded-xl border border-neutral-500 px-2 py-1"
                    required
                  />

                  {/* Confitm Password */}
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-xl border border-neutral-500 px-2 py-1"
                    required
                  />

                  {/* Submit Button */}
                  <div className="text-center font-semibold md:text-[20px] md:font-bold lg:text-[24px]">
                    <button
                      type="submit"
                      className="rounded-xl border border-neutral-500 px-2 py-1 hover:border-red-500 hover:text-red-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default AdminsPage;
