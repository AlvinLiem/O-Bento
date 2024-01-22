const request = require(`supertest`);
const app = require(`../app`);
const { Category, User } = require(`../models/index`);
const { signToken } = require("../helpers/jwt");

beforeAll(async () => {
  const staff = await User.create({
    username: "testStaff1",
    email: "testStaff1@mail.com",
    password: "123123",
    role: "Staff",
    phoneNumber: "081111111111",
    address: "Jl. Tidak Buntu No.1",
  });

  const admin = await User.create({
    username: "testAdmin1",
    email: "testAdmin1@mail.com",
    password: "123123",
    role: "Admin",
    phoneNumber: "082222222222",
    address: "Jl. Tidak Buntu No.2",
  });

  await Category.bulkCreate(require(`../data/category.json`));

  staffToken = signToken(staff);
  adminToken = signToken(admin);
});

describe("GET /categories", () => {
  it("should return all Categories", async () => {
    const response = await request(app)
      .get(`/categories`)
      .set(`authorization`, `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
  });

  it("should be fail if not logged in yet (no access_token)", async () => {
    const response = await request(app)
      .get(`/categories`)
      .set(`authorization`, `Bearer `);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token is invalid", async () => {
    const randomString = `nflkdnflsknfldnslfnlskdnfl`;
    const response = await request(app)
      .get(`/categories`)
      .set(`authorization`, `Bearer ${randomString}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
});

describe("POST /categories", () => {
  it("should return new Categories", async () => {
    const response = await request(app)
      .post(`/categories`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send({ name: "Coba-coba" });

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });

  it("should be fail if not logged in yet (no access_token)", async () => {
    const response = await request(app)
      .post(`/categories`)
      .set(`authorization`, `Bearer `)
      .send({ name: "Coba-coba" });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token is invalid", async () => {
    const randomString = `nflkdnflsknfldnslfnlskdnfl`;
    const response = await request(app)
      .post(`/categories`)
      .set(`authorization`, `Bearer ${randomString}`)
      .send({ name: "Coba-coba" });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token not Admin's", async () => {
    const response = await request(app)
      .post(`/categories`)
      .set(`authorization`, `Bearer ${staffToken}`)
      .send({ name: "Coba-coba" });

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Forbidden Access");
  });
});

describe("PUT /categories/:id", () => {
  it("should return updated Category", async () => {
    const response = await request(app)
      .put(`/categories/1`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send({ name: "Put Test" });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });

  it("should be fail if not logged in yet (no access_token)", async () => {
    const response = await request(app)
      .put(`/categories/1`)
      .set(`authorization`, `Bearer `)
      .send({ name: "Put Test" });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token is invalid", async () => {
    const randomString = `nflkdnflsknfldnslfnlskdnfl`;
    const response = await request(app)
      .put(`/categories/1`)
      .set(`authorization`, `Bearer ${randomString}`)
      .send({ name: "Put Test" });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token not Admin's", async () => {
    const response = await request(app)
      .put(`/categories/1`)
      .set(`authorization`, `Bearer ${staffToken}`)
      .send({ name: "Put Test" });

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Forbidden Access");
  });

  it("should be fail if name is empty", async () => {
    const response = await request(app)
      .put(`/categories/1`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send({ name: "" });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Name is required");
  });

  it("should be fail if category id is not registered yet", async () => {
    const response = await request(app)
      .put(`/categories/999`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send({ name: "Put Test" });

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Data Not Found");
  });
});

describe("DELETE /categories/:id", () => {
  it("should return deleted Categories", async () => {
    const response = await request(app)
      .delete(`/categories/1`)
      .set(`authorization`, `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });

  it("should be fail if not logged in yet (no access_token)", async () => {
    const response = await request(app)
      .delete(`/categories/1`)
      .set(`authorization`, `Bearer `);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token is invalid", async () => {
    const randomString = `nflkdnflsknfldnslfnlskdnfl`;
    const response = await request(app)
      .delete(`/categories/1`)
      .set(`authorization`, `Bearer ${randomString}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token not Admin's", async () => {
    const response = await request(app)
      .delete(`/categories/1`)
      .set(`authorization`, `Bearer ${staffToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Forbidden Access");
  });

  it("should be fail if category id is not registered yet", async () => {
    const response = await request(app)
      .delete(`/categories/999`)
      .set(`authorization`, `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Data Not Found");
  });
});

afterAll(async () => {
  await Category.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
