import { useState } from "react";

import { Form, Input } from "../../components/util";
import { useAuth } from "../../context/AuthContext";
import { updateAdmin } from "../../api/Service";

import { MdAdminPanelSettings, MdCancel } from "react-icons/md";

interface LineCardProp {
  label: string;
  value?: string | null;
  labelStyle?: string;
  valueStyle?: string;
}

const LineCard = ({ label, value, labelStyle, valueStyle }: LineCardProp) => {
  return (
    <p
      className={`${labelStyle} text-[18px] font-semibold text-red-500 md:text-[20px] lg:text-[24px] dark:text-red-400`}
    >
      {label}:{" "}
      <span
        className={`${valueStyle} text-[16px] text-black md:text-[18px] lg:text-[20px] dark:text-white`}
      >
        {value}
      </span>
    </p>
  );
};

const MyProfilePage = () => {
  const { user, loading } = useAuth();

  const [showEditForm, setShowEditForm] = useState(false);
  const [showChangePassForm, setShowChangePassForm] = useState(false);

  const [updateData, setUpdateData] = useState({ name: "", username: "" });
  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <div className="h-full w-full px-2 md:px-5">
      {/*=================== HEADER ========================= */}
      <header className="flex gap-5 border-b border-b-neutral-500 pb-2">
        {/* Title */}
        <section className="flex items-center gap-2 text-red-500">
          <MdAdminPanelSettings className="size-6 md:size-7 lg:size-8" />
          <h1 className="text-[18px] font-bold md:text-[22px] lg:text-2xl">
            My Profile
          </h1>
        </section>
      </header>
      {/*=================== MAIN ========================= */}
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <main className="pt-2">
          <div className="h-[72vh] rounded-xl bg-neutral-300 px-2 py-2 md:h-[75vh] md:px-5 dark:bg-neutral-800">
            {/* Profile Details Section */}
            {!showEditForm && !showChangePassForm && (
              <section>
                <div className="space-y-2">
                  <LineCard label={"ID"} value={user?.id} />
                  <LineCard label={"Name"} value={user?.name} />
                  <LineCard label={"Username"} value={user?.username} />
                  <LineCard label={"Email"} value={user?.email} />
                </div>

                {/*<Button
                  label={"Edit Profile"}
                  onClick={() => setShowEditForm(true)}
                  divStyle="text-[18px] md:text-[20px] lg:text-[24px]"
                />
                <Button
                  label={"Change Password"}
                  onClick={() => setShowChangePassForm(true)}
                  divStyle="text-[18px] md:text-[20px] lg:text-[24px]"
                />*/}
              </section>
            )}
            {/* Edit Profile Form Section */}
            {showEditForm && (
              <section className="relative md:pt-10">
                <MdCancel
                  onClick={() => setShowEditForm(false)}
                  className="absolute top-0 left-0 size-5 md:size-7"
                />
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Form submitted");

                    if (user?.role === "owner") {
                    } else if (user?.role === "admin") {
                      try {
                        updateAdmin(user.id, updateData);
                      } catch (err) {
                        console.error("Error while updating admin: ", err);
                      }
                    }
                  }}
                  formStyle=" text-center md:flex md:flex-col  "
                >
                  <Input
                    value={updateData.name}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, name: e.target.value })
                    }
                    placeholder="Name"
                    inputStyle="md:w-[200px] md:self-center"
                  />
                  <Input
                    value={updateData.username}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, username: e.target.value })
                    }
                    placeholder="Userame"
                    inputStyle="md:w-[200px] md:self-center"
                  />
                </Form>
              </section>
            )}

            {/* Change Password Form Section*/}
            {showChangePassForm && (
              <section className="relative text-center md:flex md:justify-center md:pt-10">
                <MdCancel
                  onClick={() => setShowChangePassForm(false)}
                  className="absolute left-2 size-5 md:size-7"
                />

                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (user?.role === "owner") {
                    } else if (user?.role === "admin") {
                      try {
                        updateAdmin(user.id, {
                          password: changePassword.newPassword,
                        });
                        console.log("Form submitteed");
                      } catch (err) {
                        console.error("Error while changing password: ", err);
                      }
                    }
                  }}
                  formStyle=" max-w-[300px]"
                >
                  <Input
                    value={changePassword.currentPassword}
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        currentPassword: e.target.value,
                      })
                    }
                    placeholder="Current Password"
                  />
                  <Input
                    value={changePassword.newPassword}
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="New Password"
                  />
                  <Input
                    value={changePassword.confirmPassword}
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm Password"
                  />
                </Form>
              </section>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default MyProfilePage;
