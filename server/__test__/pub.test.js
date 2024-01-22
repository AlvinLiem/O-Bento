const request = require(`supertest`);
const app = require(`../app`);
const { Cuisine, Category, User } = require(`../models/index`);
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
  await Cuisine.bulkCreate(require(`../data/cuisine.json`));

  staffToken = signToken(staff);
  adminToken = signToken(admin);
});

describe("GET /pub/cuisines", () => {
  it("should return Cuisines data", async () => {
    const response = await request(app).get(`/pub/cuisines`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("price", expect.any(Number));
    expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body[0]).toHaveProperty("categoryId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("authorId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
  });

  it("should be able to return sorted Cuisines data", async () => {
    const response = await request(app).get(`/pub/cuisines?sort=`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("price", expect.any(Number));
    expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body[0]).toHaveProperty("categoryId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("authorId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
  });

  it("should be able to return filtered Cuisines data", async () => {
    const response = await request(app).get(
      `/pub/cuisines/?filter[category]=1`
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("price", expect.any(Number));
    expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body[0]).toHaveProperty("categoryId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("authorId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
  });

  it("should be able to return paginated Cuisines data", async () => {
    const response = await request(app).get(`/pub/cuisines/`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(10);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("price", expect.any(Number));
    expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body[0]).toHaveProperty("categoryId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("authorId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
  });

  it("should be able to return searched Cuisines data", async () => {
    const response = await request(app).get(`/pub/cuisines/?sort=asc`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(10);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("name", "Easy 2");
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("price", expect.any(Number));
    expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body[0]).toHaveProperty("categoryId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("authorId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
  });
});

describe("GET /pub/cuisines/:id", () => {
  it("should return a Cuisine searched by Id", async () => {
    const response = await request(app).get(`/pub/cuisines/2`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("price", expect.any(Number));
    expect(response.body).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body).toHaveProperty("categoryId", expect.any(Number));
    expect(response.body).toHaveProperty("authorId", expect.any(Number));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
  });

  it("should be fail if cuisine id is not reqistered yet", async () => {
    const response = await request(app).get(`/pub/cuisines/999`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Data Not Found");
  });
});

afterAll(async () => {
  await Cuisine.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

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
