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
};
