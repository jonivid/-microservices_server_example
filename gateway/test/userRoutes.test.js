const request = require("supertest");
const app = require("../src/app");

describe("User API Tests", () => {
  it("should return all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("users");
    expect(res.body.users.length).toBeGreaterThan(0);
  });
});
