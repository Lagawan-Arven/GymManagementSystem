import { FaUsers } from "react-icons/fa6";

const members = [
  { id: 1, name: "Member 1" },
  { id: 2, name: "Member 2" },
  { id: 3, name: "Member 3" },
];

const OwnerAdminsPage = () => {
  return (
    <>
      <div className="h-full w-full px-2 lg:px-5 ">
        {/*=================== HEADER ========================= */}
        <header className="flex gap-5 pb-2 border-b border-b-neutral-500">
          {/* Title */}
          <section className="flex gap-2 items-center">
            <FaUsers className="lg:size-5" />
            <h1>Members</h1>
          </section>
        </header>

        {/*===================== MAIN ==================== */}
        <main className="flex flex-col md:flex-row gap-3 pt-5 w-full">
          {/* CONTAINER 1 */}
          <div className="md:w-[40vw] md:overflow-auto ">
            {/*====== Member List ========= */}
            <section className="lg:h-[75vh] rounded-xl bg-neutral-300 dark:bg-neutral-800">
              {members.map((member, index) => (
                <div key={index}>
                  <p>{member.name}</p>
                </div>
              ))}
            </section>
          </div>

          {/* CONTAINER 2 */}
          <div className="flex-1 ">
            {/*====== Member Details ========= */}
            <section className=" lg:h-[75vh] rounded-xl bg-neutral-300 dark:bg-neutral-800">
              {/*--------- Header--------- */}
              <div className="">
                <h1>Member Details</h1>
              </div>
              {/*---------Main Content -----------*/}
              <div className="  ">
                <p>Membership: Regular</p>
                <p>Membership Status: Active</p>
                <p>Member ID: 1234</p>
                <p>Name: Arven Lagawan</p>
                <p>email: arvenlagawan0731@gmail.com</p>
                <p>Age: 22</p>
                <p>Sex: Male</p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default OwnerAdminsPage;
