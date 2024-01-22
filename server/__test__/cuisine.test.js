const request = require(`supertest`);
const app = require(`../app`);
const { Cuisine, Category, User } = require(`../models/index`);
const { signToken } = require("../helpers/jwt");

const path = require("path");
const fs = require("fs");
const filePath = path.resolve(__dirname, "./asset/PecelLelee.png");
const imageBuffer = fs.readFileSync(filePath); // Buffer

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

describe("POST /cuisines", () => {
  it("should return newCuisine using name, description, price, imgUrl, categoryId ", async () => {
    const cuisineData = {
      name: "Menu Test 1",
      description: "Deskripsi menu test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 2,
    };
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(cuisineData);

    expect(response.status).toBe(201);
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

  it("should be fail if not logged in yet (no access_token)  ", async () => {
    const cuisineData = {
      name: "Menu Test 1",
      description: "Deskripsi menu test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 2,
    };
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer `)
      .send(cuisineData);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token is invalid  ", async () => {
    const cuisineData = {
      name: "Menu Test 1",
      description: "Deskripsi menu test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 2,
    };
    const randomString = `ldsflijfoiqflflkflk fsdlkflsdkf lskdflsdkfm`;
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer ${randomString}`)
      .send(cuisineData);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if name is null ", async () => {
    const cuisineData = {
      description: "Deskripsi menu test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 2,
    };
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(cuisineData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Name is required");
  });

  it("should be fail if name is empty ", async () => {
    const cuisineData = {
      name: "",
      description: "Deskripsi menu test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 2,
    };
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(cuisineData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Name is required");
  });

  it("should be fail if description is null ", async () => {
    const cuisineData = {
      name: "Menu Test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 2,
    };
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(cuisineData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Description is required");
  });

  it("should be fail if description is empty ", async () => {
    const cuisineData = {
      name: "Menu Test 1",
      description: "",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 2,
    };
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(cuisineData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Description is required");
  });

  it("should be fail if prince is null ", async () => {
    const cuisineData = {
      name: "Menu Test 1",
      description: "Deskripsi menu test 1",
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 2,
    };
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(cuisineData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Price is required");
  });

  it("should be fail if prince is empty ", async () => {
    const cuisineData = {
      name: "Menu Test 1",
      description: "Deskripsi menu test 1",
      price: Number,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 2,
    };
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(cuisineData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Price is required");
  });

  it("should be fail if prince is below 10000 ", async () => {
    const cuisineData = {
      name: "Menu Test 1",
      description: "Deskripsi menu test 1",
      price: 9999,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 2,
    };
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(cuisineData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Price is minimum Rp 10.000"
    );
  });

  it("should be fail if imgUrl is null ", async () => {
    const cuisineData = {
      name: "Menu Test 1",
      description: "Deskripsi menu test 1",
      price: 30000,
      categoryId: 2,
    };
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(cuisineData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Image is required");
  });

  it("should be fail if imgUrl is empty ", async () => {
    const cuisineData = {
      name: "Menu Test 1",
      description: "Deskripsi menu test 1",
      price: 30000,
      imgUrl: "",
      categoryId: 2,
    };
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(cuisineData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Image is required");
  });

  it("should be fail if categoryId is null ", async () => {
    const cuisineData = {
      name: "Menu Test 1",
      description: "Deskripsi menu test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
    };
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(cuisineData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Category Id is required");
  });

  it("should be fail if categoryId is empty ", async () => {
    const cuisineData = {
      name: "Menu Test 1",
      description: "Deskripsi menu test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: Number,
    };
    const response = await request(app)
      .post(`/cuisines`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(cuisineData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Category Id is required");
  });
});

describe("GET /cuisines", () => {
  it("should return cuisines include users data", async () => {
    const response = await request(app)
      .get(`/cuisines`)
      .set(`authorization`, `Bearer ${adminToken}`);

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
    expect(response.body[0]).toHaveProperty("User", expect.any(Object));
  });

  it("should be fail if not logged in yet (no access_token)", async () => {
    const response = await request(app)
      .get(`/cuisines`)
      .set(`authorization`, `Bearer `);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token is invalid", async () => {
    const randomString = `nflkdnflsknfldnslfnlskdnfl`;
    const response = await request(app)
      .get(`/cuisines`)
      .set(`authorization`, `Bearer ${randomString}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
});

describe("GET /cuisines/:id", () => {
  it("should return cuisines by Id", async () => {
    const id = 1;
    const response = await request(app)
      .get(`/cuisines/${id}`)
      .set(`authorization`, `Bearer ${adminToken}`);

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

  it("should be fail if not logged in yet (no access_token)", async () => {
    const id = 1;
    const response = await request(app)
      .get(`/cuisines/${id}`)
      .set(`authorization`, `Bearer `);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token is invalid", async () => {
    const id = 1;
    const randomString = `nflkdnflsknfldnslfnlskdnfl`;
    const response = await request(app)
      .get(`/cuisines/${id}`)
      .set(`authorization`, `Bearer ${randomString}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if using unregistered cuisine id", async () => {
    const id = 9999;
    const response = await request(app)
      .get(`/cuisines/${id}`)
      .set(`authorization`, `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Data Not Found");
  });
});

describe("PUT /cuisines/:id", () => {
  it("should return updatedCuisine with newData", async () => {
    const id = 1;
    const newData = {
      name: "PUT Test 1",
      description: "Deskripsi PUT test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 3,
    };
    const response = await request(app)
      .put(`/cuisines/${id}`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newData);

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

  it("should be fail if not logged in yet (no access_token)  ", async () => {
    const id = 1;
    const newData = {
      name: "PUT Test 1",
      description: "Deskripsi PUT test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 3,
    };
    const response = await request(app)
      .put(`/cuisines/${id}`)
      .set(`authorization`, `Bearer `)
      .send(newData);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token is invalid  ", async () => {
    const id = 1;
    const newData = {
      name: "PUT Test 1",
      description: "Deskripsi PUT test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 3,
    };
    const randomString = `ldsflijfoiqflflkflk fsdlkflsdkf lskdflsdkfm`;
    const response = await request(app)
      .put(`/cuisines/${id}`)
      .set(`authorization`, `Bearer ${randomString}`)
      .send(newData);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token neither Admin's nor author's  ", async () => {
    const id = 1;
    const newData = {
      name: "PUT Test 1",
      description: "Deskripsi PUT test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 3,
    };
    const response = await request(app)
      .put(`/cuisines/${id}`)
      .set(`authorization`, `Bearer ${staffToken}`)
      .send(newData);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Forbidden Access");
  });

  it("should be fail if cuisines id is not registered yet", async () => {
    const id = 999;
    const newData = {
      name: "PUT Test 1",
      description: "Deskripsi PUT test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 3,
    };
    const response = await request(app)
      .put(`/cuisines/${id}`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newData);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Data Not Found");
  });

  it("should be fail if name is empty", async () => {
    const id = 1;
    const newData = {
      name: "",
      description: "Deskripsi PUT test 1",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 3,
    };
    const response = await request(app)
      .put(`/cuisines/${id}`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Name is required");
  });

  it("should be fail if description is empty", async () => {
    const id = 1;
    const newData = {
      name: "PUT Test 1",
      description: "",
      price: 30000,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 3,
    };
    const response = await request(app)
      .put(`/cuisines/${id}`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Description is required");
  });

  it("should be fail if price is below 10000", async () => {
    const id = 1;
    const newData = {
      name: "PUT Test 1",
      description: "Deskripsi PUT test 1",
      price: 9999,
      imgUrl: "https://i.imgur.com/T3aGgJc.png",
      categoryId: 3,
    };
    const response = await request(app)
      .put(`/cuisines/${id}`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Price is minimum Rp 10.000"
    );
  });

  it("should be fail if imgUrl is empty", async () => {
    const id = 1;
    const newData = {
      name: "PUT Test 1",
      description: "Deskripsi PUT test 1",
      price: 30000,
      imgUrl: "",
      categoryId: 3,
    };
    const response = await request(app)
      .put(`/cuisines/${id}`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .send(newData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Image is required");
  });
});

describe("DELETE /cuisines/:id", () => {
  it("should return deleted Cuisine", async () => {
    const response = await request(app)
      .delete(`/cuisines/1`)
      .set(`authorization`, `Bearer ${adminToken}`);

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

  it("should be fail if not logged in yet (no access_token)  ", async () => {
    const response = await request(app)
      .delete(`/cuisines/1`)
      .set(`authorization`, `Bearer `);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token is invalid  ", async () => {
    const randomString = `ldsflijfoiqflflkflk fsdlkflsdkf lskdflsdkfm`;
    const response = await request(app)
      .delete(`/cuisines/1`)
      .set(`authorization`, `Bearer ${randomString}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token neither Admin's nor author's  ", async () => {
    const response = await request(app)
      .delete(`/cuisines/3`)
      .set(`authorization`, `Bearer ${staffToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Forbidden Access");
  });

  it("should be fail if cuisines id is not registered yet", async () => {
    const response = await request(app)
      .delete(`/cuisines/999`)
      .set(`authorization`, `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Data Not Found");
  });
});

describe("PATCH /cuisines/:id/image", () => {
  it("should return success message", async () => {
    const response = await request(app)
      .patch(`/cuisines/2/image`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .attach("imgUrl", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Image Easy 2 success to update"
    );
  });

  it("should be fail if not logged in yet (no access_token)  ", async () => {
    const response = await request(app)
      .patch(`/cuisines/2/image`)
      .set(`authorization`, `Bearer `)
      .attach("imgUrl", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token is invalid  ", async () => {
    const randomString = `ldsflijfoiqflflkflk fsdlkflsdkf lskdflsdkfm`;
    const response = await request(app)
      .patch(`/cuisines/2/image`)
      .set(`authorization`, `Bearer ${randomString}`)
      .attach("imgUrl", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should be fail if access_token neither Admin's nor author's  ", async () => {
    const response = await request(app)
      .patch(`/cuisines/3/image`)
      .set(`authorization`, `Bearer ${staffToken}`)
      .attach("imgUrl", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Forbidden Access");
  });

  it("should be fail if cuisines id is not registered yet", async () => {
    const response = await request(app)
      .patch(`/cuisines/999/image`)
      .set(`authorization`, `Bearer ${adminToken}`)
      .attach("imgUrl", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Data Not Found");
  });

  it("should be fail if there is no image", async () => {
    const response = await request(app)
      .patch(`/cuisines/999/image`)
      .set(`authorization`, `Bearer ${adminToken}`);

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
