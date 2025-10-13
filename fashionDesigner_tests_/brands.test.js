const express = require ("express");
const supertest = require("supertest");


// ---- Mock the Brand model ----
jest.mock("../models/brandsModel", () => {
    const BrandMock = jest.fn().mockImplementation(function(data) {
        return {
            ...data,
            save: jest.fn().mockResolvedValue({_id: "1", ...data }),       
        };
    });
    BrandMock.find = jest.fn();
    BrandMock.findById = jest.fn();
    BrandMock.findByIdAndUpdate = jest.fn();
    BrandMock.findByIdAndDelete = jest.fn();

    return { Brand: BrandMock };
});

const { Brand } = require("../models/brandsModel");
const {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandsController");


// ---- Build a small Express app for testing ----
const app = express();
app.use(express.json());
app.get("/brands", getAllBrands);
app.post("/brands", createBrand);
app.get("/brands/:id", getBrandById);
app.put("/brands/:id", updateBrand);
app.delete("/brands/:id", deleteBrand);

// ---- Test suite ----
describe("Brands API", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    // ---- GET ALL ----
    test("GET /brands -> 200 success", async () => {
        const mockBrands = [{ id: 1, name: "Polo"}];
        Brand.find.mockResolvedValue(mockBrands);

        const res = await supertest(app).get("/brands");
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockBrands);
    });

    // ---- POST ----
    test("POST /brands  -> 201 success", async () => {
        const newBrand = { name: "DKNY" }; 

        const res = await supertest(app).post("/brands").send(newBrand);

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject(newBrand);
    })

    // ---- GET BY ID ----
    test("GET /brands/:id -> 404 not found", async () => {
        Brand.findById.mockResolvedValue(null);

        const res = await supertest(app).get("/brands/doesnotexist");

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "No Brand found by that ID");
    });

    // ---- UPDATE ----
    test("PUT /brands/:id -> 200 success", async () =>{
        Brand.findByIdAndUpdate.mockResolvedValue({ id: "1", name: "Updated Brand" });

        const res = await supertest(app)
        .put("/brands/1")
        .send({ name: "Updated Name" });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ id: "1", name: "Updated Brand" });
    });
    
     // ---- DELETE ----
     test("DELETE /brands/:id -> 404 not found", async () => {
        Brand.findByIdAndDelete.mockResolvedValue(null);

        const res = await supertest(app).delete("/brands/doesnotexist");

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "No Brand found by that ID");
     });
});