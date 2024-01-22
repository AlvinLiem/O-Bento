const request = require(`supertest`);
const app = require(`../app`);
const { User } = require(`../models/index`);
const { signToken } = require("../helpers/jwt");

let staffToken;
let adminToken;

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

  staffToken = signToken(staff);
  adminToken = signToken(admin);
});

describe("POST /login", () => {
  it("should return access_code using email & password", async () => {
    const userData = {
      email: "testAdmin1@mail.com",
      password: "123123",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  it("should be fail if using null email", async () => {
    const userData = {
      password: "123123",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  it("should be fail if using empty email", async () => {
    const userData = {
      email: "",
      password: "123123",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  it("should be fail if using empty password", async () => {
    const userData = {
      email: "testAdmin1@mail.com",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  it("should be fail if using unregistered username", async () => {
    const userData = {
      username: "testAdmin2",
      password: "123123",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email or Password is invalid"
    );
  });

  it("should be fail if using unregistered email", async () => {
    const userData = {
      email: "testAdmin2@mail.com",
      password: "123123",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email or Password is invalid"
    );
  });

  it("should be fail if using wrong password", async () => {
    const userData = {
      email: "testAdmin1@mail.com",
      password: "321321",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email or Password is invalid"
    );
  });
});

describe("POST /add-user", () => {
  it("should return newUser using username, email, password, phoneNumber, address", async () => {
    const newUserData = {
      username: "testStaff3 ",
      email: "testStaff3@mail.com",
      password: "123123",
      phoneNumber: "083333333333",
      address: "Jl. Tidak Buntu No.3",
    };
    const response = await request(app)
      .post(`/add-user`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newUserData);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("username", expect.any(String));
  });

  it("should be fail if using null email", async () => {
    const newUserData = {
      username: "testStaff3 ",
      password: "123123",
      phoneNumber: "083333333333",
      address: "Jl. Tidak Buntu No.3",
    };
    const response = await request(app)
      .post(`/add-user`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  it("should be fail if using empty email", async () => {
    const newUserData = {
      username: "testStaff3 ",
      email: "",
      password: "123123",
      phoneNumber: "083333333333",
      address: "Jl. Tidak Buntu No.3",
    };
    const response = await request(app)
      .post(`/add-user`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  it("should be fail if using already registered email", async () => {
    const newUserData = {
      username: "testStaff3 ",
      email: "testStaff1@mail.com",
      password: "123123",
      phoneNumber: "083333333333",
      address: "Jl. Tidak Buntu No.3",
    };
    const response = await request(app)
      .post(`/add-user`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email is already registered"
    );
  });

  it("should be fail if using email with not email format", async () => {
    const newUserData = {
      username: "testStaff3 ",
      email: "testStaff1mailcom",
      password: "123123",
      phoneNumber: "083333333333",
      address: "Jl. Tidak Buntu No.3",
    };
    const response = await request(app)
      .post(`/add-user`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Must use Email format");
  });

  it("should be fail if using null password", async () => {
    const newUserData = {
      username: "testStaff3 ",
      email: "testStaff3@mail.com",
      phoneNumber: "083333333333",
      address: "Jl. Tidak Buntu No.3",
    };
    const response = await request(app)
      .post(`/add-user`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  it("should be fail if using empty password", async () => {
    const newUserData = {
      username: "testStaff3 ",
      email: "testStaff3@mail.com",
      password: "",
      phoneNumber: "083333333333",
      address: "Jl. Tidak Buntu No.3",
    };
    const response = await request(app)
      .post(`/add-user`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  it("should be fail if using password with length less than 5 characters", async () => {
    const newUserData = {
      username: "testStaff3 ",
      email: "testStaff3@mail.com",
      password: "1234",
      phoneNumber: "083333333333",
      address: "Jl. Tidak Buntu No.3",
    };
    const response = await request(app)
      .post(`/add-user`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Minimum Password length is 5 characters"
    );
  });

  it("should be fail if there is no access_token", async () => {
    const newUserData = {
      username: "testStaff3 ",
      email: "testStaff3@mail.com",
      password: "1234",
      phoneNumber: "083333333333",
      address: "Jl. Tidak Buntu No.3",
    };
    const response = await request(app).post(`/add-user`).send(newUserData);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if using invalid access_token", async () => {
    const newUserData = {
      username: "testStaff3 ",
      email: "testStaff3@mail.com",
      password: "1234",
      phoneNumber: "083333333333",
      address: "Jl. Tidak Buntu No.3",
    };
    const randomString = "dsdasdj51561651515dl";
    const response = await request(app)
      .post(`/add-user`)
      .set(`authorization`, `Bearer ${randomString}`)
      .send(newUserData);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if not using Admin access_token", async () => {
    const newUserData = {
      username: "testStaff3 ",
      email: "testStaff3@mail.com",
      password: "1234",
      phoneNumber: "083333333333",
      address: "Jl. Tidak Buntu No.3",
    };
    const response = await request(app)
      .post(`/add-user`)
      .set(`authorization`, `Bearer ${staffToken}`)
      .send(newUserData);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Forbidden Access");
  });
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
