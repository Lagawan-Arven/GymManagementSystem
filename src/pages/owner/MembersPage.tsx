import { useState, useMemo, useEffect } from "react";

import type { MemberPayload, Sex, BasePaymentPayload } from "../../schemas";
import { Button, Form, Input, Select } from "../../components/util";

import { FaUsers, FaClockRotateLeft } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

import {
  addMember,
  addPayment,
  fetchMembers,
  renewMembership,
} from "../../services/api/Service";

interface Member extends MemberPayload {
  id: string;
  isActive: boolean;
  days_remaining: number;
  sessions: Session[];
  admin: Admin | null;
  added_at: string;
  updated_at: string;
  renewed_at: string;
  expires_at: string;
}

interface Session {
  id: number;
  type: string;
}

interface Admin {
  id: string;
  name: string;
}

const filters = ["all", "active", "inactive"];

const MembersPage = () => {
  const [memberList, setMemberList] = useState<Member[]>([]);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await fetchMembers(null);
        setMemberList(response);
      } catch (err) {
        console.error("Error while fetching members: ", err);
      }
    };
    getMembers();
  }, []);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const filteredMembers = useMemo(() => {
    if (filter === "all") return memberList;
    else if (filter === "active")
      return memberList.filter((member) => member.isActive);
    else if (filter === "inactive")
      return memberList.filter((member) => member.isActive === false);
  }, [memberList, filter]);

  const [selectedMember, setSelectedMember] = useState<Member | null>(
    filteredMembers ? filteredMembers[0] : null,
  );
  useEffect(() => {
    setSelectedMember(filteredMembers ? filteredMembers[0] : null);
  }, [filteredMembers]);

  const [showMemberForm, setShowMemberForm] = useState(false);
  const [memberForm, setMemberForm] = useState<MemberPayload>({
    name: "",
    age: undefined,
    sex: undefined,
    email: "",
    contact_number: undefined,
  });

  const [showRenewForm, setShowRenewForm] = useState(false);
  const [renewForm, setRenewForm] = useState<BasePaymentPayload>({
    method: "",
    isDicounted: false,
  });

  return (
    <>
      <div className="h-full w-full px-3 md:px-5 ">
        {/*=================== HEADER ========================= */}
        <header className="pb-2 border-b border-b-neutral-500">
          {/* Title */}
          <section className="flex gap-2 items-center md:text-2xl md:font-bold text-red-500">
            <FaUsers className="md:size-5" />
            <h1 className="text-xl md:text-2xl font-bold">Members</h1>
          </section>
        </header>

        {/*===================== MAIN ==================== */}
        <main className="flex flex-col md:flex-row gap-2 pt-3 md:pt-5 w-full">
          {/* CONTAINER 1 */}
          <div
            className={
              detailsOpen || showMemberForm || showRenewForm
                ? "hidden md:w-[40vw] md:overflow-auto md:block "
                : "md:w-[40vw] md:overflow-auto block"
            }
          >
            {/*====== Member List ========= */}
            <section className="h-[70vh] md:h-[75vh] px-2 py-1 md:px-5 md:py-2 rounded-xl bg-neutral-300 dark:bg-neutral-800">
              {/* Filters */}
              <div className="flex gap-5 pb-1 border-b border-neutral-500">
                {filters.map((name, index) => (
                  <p
                    key={index}
                    onClick={() => setFilter(name)}
                    className={
                      name === filter
                        ? "rounded-tr-xl border-t border-r border-red-500 text-red-500 pt-1 pr-4"
                        : "rounded-tr-xl border-t border-r border-neutral-500 pt-1 pr-4"
                    }
                  >
                    {name}
                  </p>
                ))}
              </div>
              {/* The List */}
              <div className="pt-2  ">
                <div className="h-[55vh] flex flex-col gap-2">
                  {filteredMembers?.map((member, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedMember(member);
                        setDetailsOpen(true);
                      }}
                      className="px-2 py-1 md:py-2 md:px-5 rounded-xl bg-neutral-200 dark:bg-neutral-900"
                    >
                      <p>
                        {index + 1} | ID: {member.id} | {member.name}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="">
                  <Button
                    label="Add New Member"
                    onClick={() => setShowMemberForm(true)}
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
                ? "flex-1 block"
                : "hidden md:flex-1 md:block"
            }
          >
            {/* Member Details Division */}
            {!showMemberForm && !showRenewForm && (
              <div className="h-full grid gap-2 relative">
                {/*====== Return Button ========= */}
                <button
                  onClick={() => setDetailsOpen(false)}
                  className="absolute top-1 left-2 md:hidden"
                >
                  <IoIosArrowBack className="size-6" />
                </button>
                {/*====== Member Details ========= */}
                <section className=" px-2 py-2 md:px-5 grid gap-0 md:gap-2 content-center rounded-xl bg-neutral-300 dark:bg-neutral-800">
                  <h1 className="md:text-xl font-semibold text-center">
                    Member Details
                  </h1>
                  {/*---------Main Content -----------*/}
                  <div>
                    <p>
                      Member ID: <span>{selectedMember?.id}</span>
                    </p>
                    <p className="flex gap-2">
                      Membership Status:{" "}
                      <span>
                        {selectedMember?.isActive ? "Active" : "Incactive"}
                      </span>{" "}
                      <span className="flex gap-1 items-center text-neutral-500 text-[10px]">
                        (<FaClockRotateLeft /> {selectedMember?.days_remaining}{" "}
                        days left)
                      </span>
                      {selectedMember?.isActive === false && (
                        <Button
                          label="Renew"
                          onClick={() => setShowRenewForm(true)}
                        />
                      )}
                    </p>
                    {/* Sessions */}
                    <div className="flex justify-around md:pt-2">
                      <div className="text-center">
                        <p>{selectedMember?.sessions.length}</p>
                        <p className="text-xs md:text-sm text-neutral-500">
                          Sessions
                        </p>
                      </div>
                      <div className="text-center">
                        <p>
                          {
                            selectedMember?.sessions.filter(
                              (session) => session.type === "member",
                            ).length
                          }
                        </p>
                        <p className="text-xs md:text-sm text-neutral-500">
                          Member
                        </p>
                      </div>
                      <div className="text-center">
                        <p>
                          {
                            selectedMember?.sessions.filter(
                              (session) => session.type === "single",
                            ).length
                          }
                        </p>
                        <p className="text-xs md:text-sm text-neutral-500">
                          Single
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Division */}
                <div className="flex flex-col md:flex-row gap-2 ">
                  {/*====== Personal Details ========= */}
                  <section className="flex-1 rounded-xl px-2 py-2 md:px-5 grid gap-0 md:gap-2 content-center bg-neutral-300 dark:bg-neutral-800">
                    <h1 className="font-semibold text-center md:text-xl self-baseline">
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
                  <section className="flex-1 px-2 py-2 md:px-5 grid gap-0 md:gap-6 content-center rounded-xl bg-neutral-300 dark:bg-neutral-800">
                    <h1 className="font-semibold text-center md:text-xl">
                      Contact Details:{" "}
                    </h1>
                    <div>
                      <p>
                        Email:{" "}
                        <span className="text-xs ">
                          {selectedMember?.email}
                        </span>
                      </p>
                      <p>
                        Cellphone No.:{" "}
                        <span className="text-xs ">
                          {selectedMember?.contact_number}
                        </span>
                      </p>
                    </div>
                  </section>
                </div>
                {/*====== Creation Details ========= */}
                <section className="px-2 py-2 md:px-5 grid gap-0 md:gap-2 content-center rounded-xl bg-neutral-300 dark:bg-neutral-800">
                  <h1 className="font-semibold text-center md:text-xl">
                    Creation Details
                  </h1>
                  <div>
                    <p>
                      Added by:{" "}
                      <span>
                        {selectedMember?.admin
                          ? selectedMember.admin.name
                          : "Owner"}
                      </span>
                    </p>
                    <p>
                      Added at:{" "}
                      <span className="text-xs md:text-sm">
                        {selectedMember
                          ? new Date(selectedMember.added_at).toLocaleString()
                          : null}
                      </span>
                    </p>
                    <p>
                      Updated at:{" "}
                      <span>
                        {selectedMember
                          ? new Date(selectedMember.updated_at).toLocaleString()
                          : null}
                      </span>
                    </p>
                  </div>
                </section>
              </div>
            )}

            {/*-------------------- Member Form Division -----------------------*/}
            {showMemberForm && (
              <div className="h-full relative py-2 px-2 space-y-10 content-center rounded-xl bg-neutral-200 dark:bg-neutral-800">
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
                <h1 className="text-[18px] md:text-xl lg:text-[24px] font-semibold text-center">
                  Member Form
                </h1>
                {/* New Membership Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    const addNewMember = async () => {
                      try {
                        const newMember = await addMember({
                          name: memberForm.name,
                          age: memberForm.age,
                          sex: memberForm.sex,
                          email: memberForm.email,
                          contact_number: memberForm.contact_number,
                        });
                        console.log("Form submitted");
                        setMemberList((prevList) => [...prevList, newMember]);
                      } catch (err) {
                        console.error("Error while adding member: ", err);
                      }
                    };
                    addNewMember();
                    setMemberForm({
                      name: "",
                      age: undefined,
                      sex: undefined,
                      email: "",
                      contact_number: "undefined",
                    });
                  }}
                  className="grid gap-3 md:gap-5 md:justify-center"
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
                    className=" px-2 py-1 rounded-xl border border-neutral-500"
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
                      className="w-20 px-2 py-1 rounded-xl border border-neutral-500"
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
                        className=" px-2 py-1 open:border-red-500 open:bg-red-500 rounded-xl border border-neutral-500"
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
                    className=" px-2 py-1 rounded-xl border border-neutral-500"
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
                    className=" px-2 py-1 rounded-xl border border-neutral-500"
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
                </form>{" "}
              </div>
            )}
            {/* Membership Renewal Form */}
            {showRenewForm && (
              <div className="h-full relative py-2 px-2 space-y-10 content-center rounded-xl bg-neutral-200 dark:bg-neutral-800">
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
                <h1 className="text-[18px] md:text-xl lg:text-[24px] font-semibold text-center">
                  Renew Membership Form
                </h1>
                {/* Renew Form */}
                <Form
                  btnLabel="Confirm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (selectedMember) {
                      try {
                        renewMembership(selectedMember.id);
                      } catch (err) {
                        console.error("Error while renewing membership: ", err);
                      }
                      try {
                        addPayment({
                          member_id: selectedMember.id,
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
                      console.log("Form submitted");
                      return;
                    } else if (!selectedMember) {
                      console.error("There is no selected Member");
                    } else {
                      console.error("Untrack error");
                    }
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

                  <div className="flex flex-col md:flex-row gap-5 justify-center ">
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
                  <div className="flex gap-5 flex-col md:flex-row justify-center items-center">
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
