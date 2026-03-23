import { useState, useEffect } from "react";

import type { BasePaymentPayload, SessionType } from "../../schemas";

import { PiRecordFill } from "react-icons/pi";
import { addPayment, addSession } from "../../services/api/Service";

interface SingleSessionForm extends BasePaymentPayload {
  name: string;
}

interface MemberSessionForm extends BasePaymentPayload {
  id?: string;
  email?: string;
}

type PaymentMethod = "cash" | "gcash" | "others";

const SessionsPage = () => {
  const [session, setSession] = useState<SessionType>("member");
  const [memberFormData, setMemberFormData] = useState<MemberSessionForm>({
    id: undefined,
    email: undefined,
    method: "",
    isDicounted: false,
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
    <div className="h-full w-full px-3 md:px-5 ">
      {/*=================== HEADER ========================= */}
      <header className="flex gap-1 items-center pb-2 text-red-500 border-b border-b-neutral-500">
        <PiRecordFill className="size-5 md:size-7" />
        <h1 className="font-bold text-[18px] md:text-[20px] lg:text-[24px] ">
          Record Session
        </h1>
      </header>

      {/*===================== MAIN ==================== */}
      <main className="pt-2">
        {/*---------- Main Content ----------------*/}
        <div className="h-[73vh] flex flex-col gap-5 px-2 py-2 md:px-5 rounded-xl bg-neutral-300 dark:bg-neutral-800">
          {/*---- Session Type Section -----*/}
          <section className="flex justify-around pb-2 border-b border-neutral-500">
            <p
              onClick={() => setSession("member")}
              className={
                session === "member"
                  ? "text-red-500 font-semibold md:text-[20px] lg:text-[24px]"
                  : "text-neutral-500 font-semibold md:text-[20px] lg:text-[24px]"
              }
            >
              Member Session
            </p>
            <p
              onClick={() => setSession("single")}
              className={
                session === "single"
                  ? "text-red-500 font-semibold md:text-[20px] lg:text-[24px]"
                  : "text-neutral-500 font-semibold md:text-[20px] lg:text-[24px]"
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
                  if (
                    memberFormData.id === undefined &&
                    memberFormData.email === undefined
                  ) {
                    window.alert("Need atleast one value to continue");
                    return;
                  }
                  try {
                    addSession({
                      type: session,
                      member_id: memberFormData.id,
                      member_email: memberFormData.email,
                      visitor_name: null,
                    });
                  } catch (err) {
                    console.error("Error while adding member session: ", err);
                  }
                  console.log("Form submitted");
                  setMemberFormData({
                    id: undefined,
                    email: undefined,
                    method: "",
                    isDicounted: false,
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
                  className="rounded-[10px] w-37.5 self-center px-2 py-1 border border-neutral-500"
                />

                <p className="text-center">OR</p>
                {/* Member Name*/}
                <input
                  type="text"
                  placeholder="Member Name"
                  value={memberFormData.email}
                  onChange={(e) =>
                    setMemberFormData({
                      ...memberFormData,
                      email: e.target.value,
                    })
                  }
                  className="rounded-[10px] w-50 self-center px-2 py-1 border border-neutral-500"
                />
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-37.5 font-bold text-[24px] md:text-[26px] lg:text-[28px] py-1 mt-5 self-center rounded-[10px] border border-neutral-500"
                >
                  Check-in
                </button>
              </form>
            </div>
          </section>

          {/* Single Session Form Section*/}
          <section className={session === "single" ? "block " : "hidden"}>
            <div className="lg:text-[20px]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  {
                    /* Adding Session */
                  }
                  addSession({
                    type: session,
                    visitor_name: singleSessionForm.name,
                  });
                  {
                    /* Adding Payment */
                  }
                  addPayment({
                    type: "single_session",
                    amount: singleSessionForm.amount,
                    method: singleSessionForm.method,
                    isDicounted: singleSessionForm.isDicounted,
                    discount_percentage: singleSessionForm.discount_percentage,
                    discount_amount: singleSessionForm.discount_amount,
                    payor_name: singleSessionForm.name,
                  });
                  console.log("Form submitted");
                  setSingleSessionForm({
                    name: "",
                    method: "",
                    isDicounted: false,
                  });
                }}
                className=" flex flex-col gap-5 md:gap-10 text-center md:mt-10"
              >
                {/* Name */}
                <input
                  type="text"
                  placeholder="Name"
                  value={singleSessionForm.name}
                  onChange={(e) =>
                    setSingleSessionForm({
                      ...singleSessionForm,
                      name: e.target.value,
                    })
                  }
                  className="rounded-[10px] w-50 self-center ml-2 px-2 py-1 border border-neutral-500"
                  required
                />

                <div className="justify-center flex flex-col gap-5 md:flex-row md:gap-10">
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
                      className="ml-2 px-2 py-1 open:bg-red-500 rounded-[10px] border border-neutral-500"
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
                    className="rounded-[10px] ml-2 px-2 py-1 border border-neutral-500"
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
                    className="ml-2 px-2 py-1 rounded-[10px] border border-neutral-500"
                  />
                </div>
                <div className="justify-center flex flex-col gap-5 md:flex-row md:gap-10">
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
                    className="ml-2 px-2 py-1 rounded-[10px] border border-neutral-500"
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
                        className="ml-2 px-2 py-1 open:bg-red-500 rounded-[10px] border border-neutral-500"
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
                        className="w-32.5 lg:w-35 ml-2 px-2 py-1 rounded-[10px] border border-neutral-500"
                      />
                    )}
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-37.5 font-bold text-[24px] md:text-[26px] lg:text-[28px] py-1 mt-5 self-center rounded-[10px] border border-neutral-500"
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
