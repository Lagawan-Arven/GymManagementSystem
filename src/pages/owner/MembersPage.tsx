import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";

import type { MemberPayload, Sex, BasePaymentPayload } from "../../schemas";
import { Button, Form, Input, Select } from "../../components/util";
import { showSuccessToast } from "../../components/util";

import { FaUsers, FaClockRotateLeft } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

import {
  addMember,
  addPayment,
  fetchMembers,
  renewMember,
  addSession,
} from "../../api/Service";

interface Member extends MemberPayload {
  id: string;
  isActive: boolean;
  days_remaining: number;
  sessions: Session[];
  admin: Admin | null;
  renewed_by: string | null;
  updated_by: string | null;
  added_at: string;
  updated_at: string;
  renewed_at: string;
  expires_at: string;
}

interface Session {
  type: string;
}

interface Admin {
  id: string;
  name: string;
}

const filters = ["all", "active", "inactive"];

const MembersPage = () => {
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await fetchMembers(null);
        setMemberList(response.members);
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching members: ", err);
      }
    };
    getMembers();
  }, [refetch]);

  useEffect(() => {
    if (!loading && memberList.length === 0) {
      setShowDetails(false);
      setShowList(false);
    }
    if (memberList.length > 0) {
      setShowDetails(true);
      setShowList(true);
    }
  }, [memberList]);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const filteredMembers = useMemo(() => {
    if (filter === "all") return memberList;
    else if (filter === "active")
      return memberList.filter((member) => member.isActive);
    else if (filter === "inactive")
      return memberList.filter((member) => member.isActive === false);
    return [];
  }, [memberList, filter]);

  const [selectedMember, setSelectedMember] = useState<Member>(
    filteredMembers[0],
  );
  useEffect(() => {
    setSelectedMember(filteredMembers[0]);
  }, [filteredMembers]);

  const [showMemberForm, setShowMemberForm] = useState(false);
  const [memberForm, setMemberForm] = useState<MemberPayload>({
    name: "",
    age: "",
    sex: "male",
    email: "",
    contact_number: "",
  });

  const [showRenewForm, setShowRenewForm] = useState(false);
  const [renewForm, setRenewForm] = useState<BasePaymentPayload>({
    method: "",
    isDicounted: false,
  });

  return (
    <>
      <div className="h-full w-full px-3 md:px-5">
        {/*=================== HEADER ========================= */}
        <header className="border-b border-b-neutral-500 pb-2">
          {/* Title */}
          <section className="flex items-center gap-2 text-red-500 md:text-2xl md:font-bold">
            <FaUsers className="md:size-5" />
            <h1 className="text-xl font-bold md:text-2xl">Members</h1>
          </section>
        </header>

        {/*===================== MAIN ==================== */}
        <main className="flex w-full flex-col gap-2 pt-3 md:flex-row md:pt-5">
          {/* CONTAINER 1 */}
          <div
            className={
              detailsOpen || showMemberForm || showRenewForm
                ? "hidden md:block md:w-[35vw] md:overflow-auto"
                : "block md:w-[35vw] md:overflow-auto"
            }
          >
            {/*====== Member List ========= */}
            <section className="h-[70vh] rounded-xl bg-neutral-300 px-2 py-1 md:h-[75vh] md:px-5 md:py-2 dark:bg-neutral-800">
              {/* Filters */}
              <div className="flex gap-5 border-b border-neutral-500 pb-1">
                {filters.map((name, index) => (
                  <p
                    key={index}
                    onClick={() => setFilter(name)}
                    className={
                      name === filter
                        ? "rounded-tr-xl border-t border-r border-red-500 pt-1 pr-4 text-red-500"
                        : "rounded-tr-xl border-t border-r border-neutral-500 pt-1 pr-4"
                    }
                  >
                    {name}
                  </p>
                ))}
              </div>
              {/* The List */}
              <div className="pt-2">
                {loading && (
                  <div className="h-[55vh]">
                    <p className="place-self-center pt-40 text-[18px] font-semibold md:text-[20px] lg:text-[24px]">
                      Loading...
                    </p>
                  </div>
                )}
                {!showList ? (
                  <div className="h-[55vh] content-center">
                    <p className="place-self-center text-[18px] font-semibold md:text-[20px] lg:text-[24px]">
                      No data to show
                    </p>
                  </div>
                ) : (
                  <div className="flex h-[55vh] flex-col gap-2 overflow-auto">
                    {filteredMembers?.map((member, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedMember(member);
                          setDetailsOpen(true);
                        }}
                        className="rounded-xl bg-neutral-200 px-2 py-1 md:px-5 md:py-2 dark:bg-neutral-900"
                      >
                        <p>
                          {index + 1} | {member.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="">
                  <Button
                    label="Add New Member"
                    onClick={() => {
                      setShowMemberForm(true);
                    }}
                    btnStyle="font-semibold lg:font-bold md:text-[18px] lg:text-[24px]"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* CONTAINER 2 */}
          <div
            className={
              detailsOpen || showMemberForm || showRenewForm
                ? "block flex-1"
                : "hidden md:block md:flex-1"
            }
          >
            {/* Member Details Division */}
            {!showMemberForm && !showRenewForm && (
              <div className="relative h-full">
                {/*====== Return Button ========= */}
                <button
                  onClick={() => setDetailsOpen(false)}
                  className="absolute top-1 left-2 md:hidden"
                >
                  <IoIosArrowBack className="size-6" />
                </button>

                {!showDetails ? (
                  <div className="h-full flex-1 content-center rounded-xl bg-neutral-300 dark:bg-neutral-800">
                    <p className="place-self-center text-[18px] font-semibold md:text-[20px] lg:text-[24px]">
                      No data to show
                    </p>
                  </div>
                ) : (
                  <div className="grid h-full w-full gap-2">
                    {/*====== Member Details ========= */}
                    <section className="grid content-center gap-0 rounded-xl bg-neutral-300 px-2 py-2 md:gap-2 md:px-5 dark:bg-neutral-800">
                      <h1 className="text-center font-semibold md:text-[18px] lg:text-[20px]">
                        Member Details
                      </h1>
                      {/*---------Main Content -----------*/}
                      <div>
                        {/* Member ID */}
                        <p>
                          Member ID: <span>{selectedMember?.id}</span>
                        </p>
                        {/* Membership Status */}
                        <p className="flex gap-2">
                          Membership Status:{" "}
                          <span>
                            {selectedMember?.isActive ? "Active" : "Incactive"}
                          </span>{" "}
                          <span className="flex items-center gap-1 text-[10px] text-neutral-500">
                            (<FaClockRotateLeft />{" "}
                            {selectedMember?.days_remaining} days left)
                          </span>
                          {selectedMember?.isActive === false && (
                            <Button
                              label="Renew"
                              onClick={() => setShowRenewForm(true)}
                            />
                          )}
                        </p>
                        {/* Total Sessions */}
                        <p>
                          Total Sessions:{" "}
                          <span>{selectedMember?.sessions.length}</span>
                        </p>
                      </div>
                    </section>
                    {/* Division */}
                    <div className="flex flex-col gap-2 md:flex-row">
                      {/*====== Personal Details ========= */}
                      <section className="grid flex-1 content-center gap-0 rounded-xl bg-neutral-300 px-2 py-2 md:gap-2 md:px-5 dark:bg-neutral-800">
                        <h1 className="self-baseline text-center font-semibold md:text-[18px] lg:text-[20px]">
                          Personal Details:
                        </h1>
                        <div>
                          <p>
                            Name: <span>{selectedMember?.name}</span>
                          </p>
                          <p>
                            Age: <span>{selectedMember?.age}</span>
                          </p>
                          <p>
                            Sex: <span>{selectedMember?.sex}</span>
                          </p>
                        </div>
                      </section>
                      {/*====== Contact Details ========= */}
                      <section className="grid flex-1 content-center gap-0 rounded-xl bg-neutral-300 px-2 py-2 md:gap-6 md:px-5 dark:bg-neutral-800">
                        <h1 className="text-center font-semibold md:text-[18px] lg:text-[20px]">
                          Contact Details:{" "}
                        </h1>
                        <div>
                          <p>
                            Email:{" "}
                            <span className="text-xs">
                              {selectedMember?.email}
                            </span>
                          </p>
                          <p>
                            Cellphone No.:{" "}
                            <span className="text-xs">
                              {selectedMember?.contact_number}
                            </span>
                          </p>
                        </div>
                      </section>
                    </div>
                    {/*====== Creation Details ========= */}
                    <section className="grid content-center gap-0 rounded-xl bg-neutral-300 px-2 py-2 md:gap-2 md:px-5 dark:bg-neutral-800">
                      <h1 className="text-center font-semibold md:text-[18px] lg:text-[20px]">
                        Creation Details
                      </h1>
                      <div>
                        <p>
                          Added by:{" "}
                          <span>
                            {selectedMember.admin
                              ? selectedMember.admin.name
                              : "Owner"}
                          </span>
                        </p>
                        <p>
                          Added at:{" "}
                          <span className="text-xs text-neutral-500 md:text-sm">
                            {selectedMember
                              ? new Date(
                                  selectedMember.added_at,
                                ).toLocaleString(undefined, {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })
                              : null}
                          </span>
                        </p>
                        <p>
                          Updated at:{" "}
                          <span className="text-xs text-neutral-500 md:text-sm">
                            {selectedMember
                              ? new Date(
                                  selectedMember.updated_at,
                                ).toLocaleString(undefined, {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })
                              : null}
                          </span>
                        </p>
                      </div>
                    </section>
                  </div>
                )}
              </div>
            )}

            {/*-------------------- Member Form Division -----------------------*/}
            {showMemberForm && (
              <div className="relative h-full content-center space-y-10 rounded-xl bg-neutral-200 px-2 py-2 dark:bg-neutral-800">
                {/* Return Button */}
                <button
                  onClick={() => {
                    setShowMemberForm(false);
                  }}
                  className="absolute"
                >
                  <IoIosArrowBack className="size-7" />
                </button>
                {/* Header */}
                <h1 className="text-center text-[18px] font-semibold md:text-xl lg:text-[24px]">
                  Member Form
                </h1>
                {/* New Membership Form */}
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    console.log("Form submitted");

                    const addNewMember = async (): Promise<
                      string | undefined
                    > => {
                      try {
                        const response = await addMember({
                          name: memberForm.name,
                          age: memberForm.age === "" ? null : memberForm.age,
                          sex: memberForm.sex,
                          email: memberForm.email,
                          contact_number:
                            memberForm.contact_number === ""
                              ? null
                              : memberForm.contact_number,
                        });
                        setRefetch(!refetch);
                        showSuccessToast(response.message);
                        setShowMemberForm(false);
                        return response.member.id;
                      } catch (err) {
                        console.error("Error while adding member: ", err);
                        toast.error("Adding member failed");
                      }
                    };

                    const AddSession = async (id: string | undefined) => {
                      try {
                        const res = await addSession({
                          type: "member",
                          member_id: id,
                          visitor_name: null,
                        });
                        showSuccessToast(res.message);
                        console.log(res.message);
                      } catch (err) {
                        console.error(
                          "Error while adding member session: ",
                          err,
                        );
                        toast.error("Adding session failed");
                      }
                    };
                    const member_id = addNewMember();
                    AddSession(await member_id);
                    setMemberForm({
                      name: "",
                      age: "",
                      sex: "male",
                      email: "",
                      contact_number: "",
                    });
                  }}
                  className="grid gap-3 md:justify-center md:gap-5"
                >
                  {/* Name */}
                  <input
                    id="memberName"
                    type="text"
                    placeholder="Member Name"
                    value={memberForm?.name}
                    onChange={(e) =>
                      setMemberForm({
                        ...memberForm,
                        name: e.target.value,
                      })
                    }
                    className="rounded-xl border border-neutral-500 px-2 py-1"
                    required
                  />

                  <div className="flex gap-2 md:gap-5">
                    {/* Age*/}
                    <input
                      id="memberAge"
                      type="number"
                      placeholder="Age"
                      value={memberForm.age ? memberForm.age : undefined}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          age: Number(e.target.value),
                        })
                      }
                      className="w-20 rounded-xl border border-neutral-500 px-2 py-1"
                    />

                    {/* Sex */}
                    <label htmlFor="memberSex">
                      Sex:{" "}
                      <select
                        id="memberSex"
                        value={memberForm.sex ? memberForm.sex : undefined}
                        onChange={(e) =>
                          setMemberForm({
                            ...memberForm,
                            sex: e.target.value as Sex,
                          })
                        }
                        className="rounded-xl border border-neutral-500 px-2 py-1 open:border-red-500 open:bg-red-500"
                      >
                        <option value={undefined}>None</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </label>
                  </div>

                  {/* Email*/}
                  <input
                    id="memberEmail"
                    type="text"
                    placeholder="Member Email"
                    value={memberForm?.email}
                    onChange={(e) =>
                      setMemberForm({
                        ...memberForm,
                        email: e.target.value,
                      })
                    }
                    className="rounded-xl border border-neutral-500 px-2 py-1"
                    required
                  />

                  {/* Contact Number */}
                  <input
                    id="memberContact"
                    type="text"
                    placeholder="Member Contact Number"
                    value={
                      memberForm.contact_number
                        ? memberForm.contact_number
                        : undefined
                    }
                    onChange={(e) =>
                      setMemberForm({
                        ...memberForm,
                        contact_number: e.target.value,
                      })
                    }
                    className="rounded-xl border border-neutral-500 px-2 py-1"
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
                </form>{" "}
              </div>
            )}
            {/* Membership Renewal Form */}
            {showRenewForm && (
              <div className="relative h-full content-center space-y-10 rounded-xl bg-neutral-200 px-2 py-2 dark:bg-neutral-800">
                {/* Return Button */}
                <button
                  onClick={() => {
                    setShowRenewForm(false);
                  }}
                  className="absolute"
                >
                  <IoIosArrowBack className="size-7" />
                </button>

                {/* Header */}
                <h1 className="text-center text-[18px] font-semibold md:text-xl lg:text-[24px]">
                  Renew Membership Form
                </h1>
                {/* Renew Form */}
                <Form
                  btnLabel="Confirm"
                  onSubmit={(e) => {
                    e.preventDefault();

                    const RenewMember = async () => {
                      try {
                        const res = await renewMember(selectedMember?.id);
                        showSuccessToast(res.message);
                      } catch (err) {
                        console.error("Error while renewing membership: ", err);
                        toast.error("Membership renewal failed");
                      }
                    };
                    const AddPayment = async () => {
                      try {
                        await addPayment({
                          member_id: selectedMember?.id,
                          type: "membership_renewal",
                          amount: renewForm.amount,
                          method: renewForm.method,
                          isDicounted: renewForm.isDicounted,
                          discount_percentage: renewForm.discount_percentage,
                          discount_amount: renewForm.discount_amount,
                        });
                      } catch (err) {
                        console.error(
                          "Error while processing membership renewal payment: ",
                          err,
                        );
                      }
                    };
                    RenewMember();
                    AddPayment();
                  }}
                  formStyle=" items-center justify-center "
                >
                  <div className="text-center">
                    {/* isDiscounted Payment*/}
                    <Select
                      label="Payment"
                      options={[
                        { label: "Regular", value: false },
                        { label: "Discounted", value: true },
                      ]}
                      inputId="payment"
                      value={renewForm.isDicounted}
                      onChange={(e) =>
                        setRenewForm({
                          ...renewForm,
                          isDicounted: Boolean(e.target.value),
                        })
                      }
                      inputStyle="  "
                      labelStyle="  "
                    />
                  </div>

                  <div className="flex flex-col justify-center gap-5 md:flex-row">
                    {/* Discount Percent */}
                    <Input
                      type="text"
                      placeholder="Discount Percent"
                      value={renewForm.discount_percentage}
                      onChange={(e) =>
                        setRenewForm({
                          ...renewForm,
                          discount_percentage: e.target.value,
                        })
                      }
                      inputStyle="  "
                    />
                    {/* Discount Amount */}
                    <Input
                      type="number"
                      placeholder="Discount Amount"
                      value={renewForm.discount_amount}
                      onChange={(e) =>
                        setRenewForm({
                          ...renewForm,
                          discount_amount: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
                    <Input
                      type="number"
                      placeholder="Payment Amount"
                      value={renewForm.amount}
                      onChange={(e) =>
                        setRenewForm({
                          ...renewForm,
                          amount: Number(e.target.value),
                        })
                      }
                    />
                    <Select
                      label="Payment Method"
                      options={[
                        { label: "Cash", value: "cash" },
                        { label: "GCash", value: "gcash" },
                        { label: "Others", value: "others" },
                      ]}
                      inputId="paymentMethod"
                      value={renewForm.method}
                      onChange={(e) =>
                        setRenewForm({
                          ...renewForm,
                          method: e.target.value,
                        })
                      }
                      inputStyle=" rounded-[10px] border border-neutral-500 "
                    />
                  </div>
                </Form>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default MembersPage;
