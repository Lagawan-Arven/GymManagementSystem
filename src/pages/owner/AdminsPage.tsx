import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { showSuccessToast } from "../../components/util";
import { addAdmin, fetchAdmins } from "../../services/api/Service";
import type { AdminPayload } from "../../schemas";

import type { IconType } from "react-icons";
import { MdAdminPanelSettings } from "react-icons/md";
import { TbSum } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

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
      <p className="flex gap-1 items-center justify-center text-[14px] md:text-[18px] lg:text-[20px]">
        {Icon && <Icon className={iconStyle} />}
        {text} <span>{value}</span>{" "}
      </p>
      <p className="text-[12px] md:text-[14px] lg:text-[16px] text-neutral-500">
        {label}
      </p>
    </div>
  );
};

const AdminsPage = () => {
  const [adminList, setAdminList] = useState<Admin[]>([]);
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(true);

  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await fetchAdmins();
        setAdminList(response.admins);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching admins:", error);
      }
    };
    getAdmins();
  }, [refetch]);

  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  useEffect(() => {
    if (adminList.length > 0) {
      setSelectedAdmin(adminList[0]);
      setShowData(true);
    }
    if (adminList.length === 0 && loading === false) {
      setShowData(false);
    }
  }, [adminList]);

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
      <div className="h-full w-full px-2 md:px-5 ">
        {/*=================== HEADER ========================= */}
        <header className="flex gap-5 pb-2 border-b border-b-neutral-500">
          {/* Title */}
          <section className="flex gap-2 items-center text-red-500">
            <MdAdminPanelSettings className="size-6 md:size-7 lg:size-8" />
            <h1 className="text-[18px] md:text-[22px] lg:text-2xl font-bold ">
              Admins
            </h1>
          </section>
        </header>

        {/*===================== MAIN ==================== */}
        <main className="flex flex-col md:flex-row gap-3 md:gap-2 pt-2">
          {/*====== Admin List Section ========= */}
          <section className="md:w-[40vw]">
            {/*----------- Section Content ---------- */}
            <div className="h-[20vh] md:h-[75vh] w-full px-2 py-2 md:px-5 rounded-xl bg-neutral-300 dark:bg-neutral-800">
              {loading && (
                <div className="h-[10vh] md:h-[60vh] content-center text-center">
                  <p className=" font-semibold text-[18px] md:text-[20px] lg:text-[24px]">
                    Loading...
                  </p>
                </div>
              )}
              {/*WHAT TO SHOW IF THERE IS NO DATA */}
              {!showData ? (
                <div className="h-[10vh] md:h-[60vh] content-center text-center">
                  <p className=" font-semibold text-[18px] md:text-[20px] lg:text-[24px]">
                    No data to show
                  </p>
                </div>
              ) : (
                <div className="h-[10vh] md:h-[60vh] flex flex-col gap-2 overflow-auto">
                  {adminList.map((admin, index) => (
                    <div
                      onClick={() => {
                        setSelectedAdmin(admin);
                      }}
                      key={index}
                      className="px-2 py-1 md:px-5 md:py-2 rounded-xl bg-neutral-200 dark:bg-neutral-900"
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
                  className=" mt-3 px-2 py-1 font-semibold md:font-bold md:text-[20px] lg:text-[24px] rounded-[10px] border border-neutral-500"
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
              <div className="h-[50vh] md:h-[75vh] w-full  rounded-xl bg-neutral-300 dark:bg-neutral-800">
                {/*WHAT TO SHOW IF THERE IS NO DATA */}
                {!showData ? (
                  <div className="h-full content-center text-center">
                    <p className=" font-semibold text-[18px] md:text-[20px] lg:text-[24px]">
                      No data to show
                    </p>
                  </div>
                ) : (
                  <div className="h-full py-2 px-2 space-y-5 md:gap-y-10 content-center md:px-5">
                    {/* Header */}
                    <h1 className="text-[18px] md:text-xl lg:text-[24px] font-semibold text-center">
                      Admin Details
                    </h1>
                    {/* Line info*/}
                    <div className="space-y-1">
                      {/* ID*/}
                      <p className="text-[16px] md:text-[18px] lg:text-[20px]">
                        ID:{"  "}
                        {selectedAdmin && (
                          <span className="font-sans ">{selectedAdmin.id}</span>
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
                          <span className="font-mono text-[12px] md:text-[14px] lg:text-[16px] text-neutral-500">
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
                          <span className="font-mono text-[12px] md:text-[14px] lg:text-[16px text-neutral-500">
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
              <div className="relative h-[50vh] md:h-[75vh] w-full py-2 px-2 space-y-5 md:space-y-10 md:px-5 md:content-center rounded-xl bg-neutral-300 dark:bg-neutral-800">
                {/* Return Button */}
                <button
                  onClick={() => setShowAdminForm(false)}
                  className="absolute"
                >
                  <IoIosArrowBack className="size-7" />
                </button>

                {/* Header */}
                <h1 className="text-[18px] md:text-xl lg:text-[24px] font-semibold text-center">
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
                  className="grid gap-3 md:gap-5 md:justify-center"
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
                    className=" px-2 py-1 rounded-xl border border-neutral-500"
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
                    className=" px-2 py-1 rounded-xl border border-neutral-500"
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
                    className=" px-2 py-1 rounded-xl border border-neutral-500"
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
                    className=" px-2 py-1 rounded-xl border border-neutral-500"
                    required
                  />

                  {/* Confitm Password */}
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className=" px-2 py-1 rounded-xl border border-neutral-500"
                    required
                  />

                  {/* Submit Button */}
                  <div className="text-center md:text-[20px] lg:text-[24px] font-semibold md:font-bold">
                    <button
                      type="submit"
                      className="px-2 py-1 rounded-xl border border-neutral-500 hover:border-red-500 hover:text-red-500"
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
