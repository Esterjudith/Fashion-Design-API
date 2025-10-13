const express = require("express");
const supertest = require("supertest");

// ---- Mock the Designer model ----
jest.mock("../models/designersModel", () => {
  // Constructor mock (for `new Designer().save()`)
  const DesignerMock = jest.fn().mockImplementation(function (data) {
    return {
      ...data,
      save: jest.fn().mockResolvedValue({ _id: "1", ...data }),
    };
  });

  // Attach static methods used by controllers
  DesignerMock.find = jest.fn();
  DesignerMock.findById = jest.fn();
  DesignerMock.findByIdAndUpdate = jest.fn();
  DesignerMock.findByIdAndDelete = jest.fn();

  return { Designer: DesignerMock };
});

const { Designer } = require("../models/designersModel");
const {
  getAllDesigners,
  createDesigner,
  getDesignerById,
  updateDesigner,
  deleteDesigner,
} = require("../controllers/designerController");

// ---- Build a small Express app for testing ----
const app = express();
app.use(express.json());
app.get("/designers", getAllDesigners);
app.post("/designers", createDesigner);
app.get("/designers/:id", getDesignerById);
app.put("/designers/:id", updateDesigner);
app.delete("/designers/:id", deleteDesigner);

// ---- Test suite ----
describe("Designers API (lighter tests)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ---- GET ALL ----
  test("GET /designers → 200 success", async () => {
    const mockDesigners = [{ id: 1, name: "Coco Chanel" }];
    Designer.find.mockResolvedValue(mockDesigners);

    const res = await supertest(app).get("/designers");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockDesigners);
  });

  // ---- POST ----
  test("POST /designers → 201 success", async () => {
    const newDesigner = { name: "Giorgio Armani" };

    const res = await supertest(app).post("/designers").send(newDesigner);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newDesigner);
  });

  // ---- GET BY ID ----
  test("GET /designers/:id → 404 not found", async () => {
    Designer.findById.mockResolvedValue(null);

    const res = await supertest(app).get("/designers/doesnotexist");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "No Designer found by that ID");
  });

  // ---- UPDATE ----
  test("PUT /designers/:id → 200 success", async () => {
    Designer.findByIdAndUpdate.mockResolvedValue({ id: "1" });

    const res = await supertest(app)
      .put("/designers/1")
      .send({ name: "Updated Name" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Designer successfully updated"
    );
  });

  // ---- DELETE ----
  test("DELETE /designers/:id → 404 not found", async () => {
    Designer.findByIdAndDelete.mockResolvedValue(null);

    const res = await supertest(app).delete("/designers/doesnotexist");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "No Designer found by that ID");
  });
});