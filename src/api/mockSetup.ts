import MockAdapter from "axios-mock-adapter";
import { api } from "./axios";
import { dummyMembers, dummyPayments, dummyLogs } from "./mockData";

export const setupMockApi = () => {
  // delayResponse simulates network latency
  const mock = new MockAdapter(api, { delayResponse: 800 });

  console.log("🛠️ Dev Mocks Enabled: Intercepting API calls");

  // Intercept GET /members/
  mock.onGet("/members/").reply(200, {
    success: true,
    members: dummyMembers,
  });

  // Intercept POST /members/ (Simulating a successful creation)
  mock.onPost("/members/").reply(201, {
    success: true,
    member: { ...dummyMembers[0], id: `m-${Math.random()}` },
  });

  // Intercept GET /payments/internal
  mock.onGet("/payments/internal").reply(200, {
    success: true,
    payments: dummyPayments,
  });

  // Intercept GET /logs/
  mock.onGet("/logs/").reply(200, {
    success: true,
    logs: dummyLogs,
  });

  mock.onPost("/sessions/").reply(200, { success: true });

  // Allow any other requests (like external auth) to pass through normally
  mock.onAny().passThrough();

  // Intercept PUT /users/me
  mock.onPut("/users/me").reply((config) => {
    // Parse the data you just sent from the form
    const payload = JSON.parse(config.data);

    // Grab the existing fake user from local storage
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    // Merge the new data with the old data
    const updatedUser = { ...currentUser, ...payload };

    return [200, updatedUser];
  });
};
