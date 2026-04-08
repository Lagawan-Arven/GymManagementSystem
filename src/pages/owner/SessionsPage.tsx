import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import type { BasePaymentPayload, SessionType } from "../../schemas";
import { showSuccessToast } from "../../components/util";

import { PiRecordFill } from "react-icons/pi";
import { addPayment, addSession } from "../../api/Service";

interface SingleSessionForm extends BasePaymentPayload {
  name: string;
}

type PaymentMethod = "cash" | "gcash" | "others";

const SessionsPage = () => {
  const [session, setSession] = useState<SessionType>("member");
  const [memberFormData, setMemberFormData] = useState({
    id: "",
    email: "",
  });
  const [singleSessionForm, setSingleSessionForm] = useState<SingleSessionForm>(
    {
      name: "",
      method: "",
      isDicounted: false,
    },
  );

  const [specifyMethod, setSpecifyMethod] = useState(false);

  useEffect(() => {
    if (singleSessionForm.method === "others") {
      setSpecifyMethod(true);
    }
  }, [singleSessionForm.method]);

  return (
    <div className="h-full w-full px-3 md:px-5">
      {/*=================== HEADER ========================= */}
      <header className="flex items-center gap-1 border-b border-b-neutral-500 pb-2 text-red-500">
        <PiRecordFill className="size-5 md:size-7" />
        <h1 className="text-[18px] font-bold md:text-[20px] lg:text-[24px]">
          Record Session
        </h1>
      </header>

      {/*===================== MAIN ==================== */}
      <main className="pt-2">
        {/*---------- Main Content ----------------*/}
        <div className="flex h-[73vh] flex-col gap-5 rounded-xl bg-neutral-300 px-2 py-2 md:px-5 dark:bg-neutral-800">
          {/*---- Session Type Section -----*/}
          <section className="flex justify-around border-b border-neutral-500 pb-2">
            <p
              onClick={() => setSession("member")}
              className={
                session === "member"
                  ? "font-semibold text-red-500 md:text-[20px] lg:text-[24px]"
                  : "font-semibold text-neutral-500 md:text-[20px] lg:text-[24px]"
              }
            >
              Member Session
            </p>
            <p
              onClick={() => setSession("single")}
              className={
                session === "single"
                  ? "font-semibold text-red-500 md:text-[20px] lg:text-[24px]"
                  : "font-semibold text-neutral-500 md:text-[20px] lg:text-[24px]"
              }
            >
              Single Session
            </p>
          </section>

          {/*-------- Session Forms -------*/}
          {/* Member Form Section*/}
          <section className={session === "member" ? "block" : "hidden"}>
            <div className="lg:text-[20px]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (memberFormData.id === "" && memberFormData.email === "") {
                    toast("Need atleast one value to continue");
                    return;
                  }
                  console.log("Form submitted");
                  const AddSession = async () => {
                    try {
                      const res = await addSession({
                        type: session,
                        member_id:
                          memberFormData.id === "" ? null : memberFormData.id,
                        member_email:
                          memberFormData.email === ""
                            ? null
                            : memberFormData.email,
                        visitor_name: null,
                      });

                      showSuccessToast(res.message);
                      console.log(res.message);
                    } catch (err) {
                      console.error("Error while adding member session: ", err);
                      toast.error("Adding session failed");
                    }
                  };
                  AddSession();
                  setMemberFormData({
                    id: "",
                    email: "",
                  });
                }}
                className="flex flex-col gap-2 md:justify-center"
              >
                {/* Member ID */}
                <input
                  type="text"
                  placeholder="Member ID"
                  value={memberFormData.id}
                  onChange={(e) =>
                    setMemberFormData({
                      ...memberFormData,
                      id: e.target.value,
                    })
                  }
                  className="w-37.5 self-center rounded-[10px] border border-neutral-500 px-2 py-1"
                />

                <p className="text-center">OR</p>
                {/* Member Name*/}
                <input
                  type="text"
                  placeholder="Member Email"
                  value={memberFormData.email}
                  onChange={(e) =>
                    setMemberFormData({
                      ...memberFormData,
                      email: e.target.value,
                    })
                  }
                  className="w-50 self-center rounded-[10px] border border-neutral-500 px-2 py-1"
                />
                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-5 w-37.5 self-center rounded-[10px] border border-neutral-500 py-1 text-[24px] font-bold md:text-[26px] lg:text-[28px]"
                >
                  Check-in
                </button>
              </form>
            </div>
          </section>

          {/* Single Session Form Section*/}
          <section className={session === "single" ? "block" : "hidden"}>
            <div className="lg:text-[20px]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Form submitted");
                  const AddSession = async () => {
                    try {
                      const res = await addSession({
                        type: session,
                        visitor_name: singleSessionForm.name,
                      });
                      console.log(res.message);
                      showSuccessToast(res.message);
                    } catch (err) {
                      toast.error("Adding session failed");
                      console.error("Error while adding session: ", err);
                    }
                  };

                  const AddPayment = async () => {
                    try {
                      const res = await addPayment({
                        type: "single_session",
                        amount: singleSessionForm.amount,
                        method: singleSessionForm.method,
                        isDicounted: singleSessionForm.isDicounted,
                        discount_percentage:
                          singleSessionForm.discount_percentage,
                        discount_amount: singleSessionForm.discount_amount,
                        payor_name: singleSessionForm.name,
                      });
                      console.log(res.message);
                    } catch (err) {
                      console.error("Error while adding payment: ", err);
                    }
                  };
                  AddSession();
                  AddPayment();

                  setSingleSessionForm({
                    name: "",
                    method: "",
                    isDicounted: false,
                  });
                }}
                className="flex flex-col gap-5 text-center md:mt-10 md:gap-10"
              >
                {/* Name */}
                <input
                  type="text"
                  placeholder="Visitor's Name"
                  value={singleSessionForm.name}
                  onChange={(e) =>
                    setSingleSessionForm({
                      ...singleSessionForm,
                      name: e.target.value,
                    })
                  }
                  className="ml-2 w-50 self-center rounded-[10px] border border-neutral-500 px-2 py-1"
                  required
                />

                <div className="flex flex-col justify-center gap-5 md:flex-row md:gap-10">
                  {/* Payment */}
                  <label>
                    Payment:
                    <select
                      value={String(singleSessionForm.isDicounted)}
                      onChange={(e) =>
                        setSingleSessionForm({
                          ...singleSessionForm,
                          isDicounted: Boolean(e.target.value),
                        })
                      }
                      className="ml-2 rounded-[10px] border border-neutral-500 px-2 py-1 open:bg-red-500"
                    >
                      <option value={"false"}>Regular</option>
                      <option value={"true"}>Discounted</option>
                    </select>{" "}
                  </label>

                  {/* Discount Percentage*/}
                  <input
                    type="text"
                    placeholder="Discount Percent"
                    value={singleSessionForm.discount_percentage}
                    onChange={(e) =>
                      setSingleSessionForm({
                        ...singleSessionForm,
                        discount_percentage: e.target.value,
                      })
                    }
                    className="ml-2 rounded-[10px] border border-neutral-500 px-2 py-1"
                  />

                  {/* Discount Amount */}
                  <input
                    type="number"
                    value={singleSessionForm.discount_amount}
                    onChange={(e) =>
                      setSingleSessionForm({
                        ...singleSessionForm,
                        discount_amount: Number(e.target.value),
                      })
                    }
                    placeholder="Discount Amount"
                    className="ml-2 rounded-[10px] border border-neutral-500 px-2 py-1"
                  />
                </div>
                <div className="flex flex-col justify-center gap-5 md:flex-row md:gap-10">
                  {/* Payment Amount */}
                  <input
                    type="text"
                    value={singleSessionForm.amount}
                    onChange={(e) =>
                      setSingleSessionForm({
                        ...singleSessionForm,
                        amount: Number(e.target.value),
                      })
                    }
                    placeholder="Payment Amount"
                    className="ml-2 rounded-[10px] border border-neutral-500 px-2 py-1"
                    required
                  />

                  {/* Payment Method*/}
                  <label>
                    Payment Method:
                    {!specifyMethod && (
                      <select
                        value={singleSessionForm.method}
                        onChange={(e) =>
                          setSingleSessionForm({
                            ...singleSessionForm,
                            method: e.target.value as PaymentMethod,
                          })
                        }
                        className="ml-2 rounded-[10px] border border-neutral-500 px-2 py-1 open:bg-red-500"
                      >
                        <option value="cash">Cash</option>
                        <option value="gcash">GCash</option>
                        <option value="others">Others</option>
                      </select>
                    )}
                    {specifyMethod && (
                      <input
                        type="text"
                        placeholder="Please specify..."
                        value={singleSessionForm.method}
                        onChange={(e) =>
                          setSingleSessionForm({
                            ...singleSessionForm,
                            method: e.target.value,
                          })
                        }
                        className="ml-2 w-32.5 rounded-[10px] border border-neutral-500 px-2 py-1 lg:w-35"
                      />
                    )}
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-5 w-37.5 self-center rounded-[10px] border border-neutral-500 py-1 text-[24px] font-bold md:text-[26px] lg:text-[28px]"
                >
                  Check-in
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SessionsPage;
