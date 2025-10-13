const express = require("express");
const supertest = require("supertest");

// ---- Mock the Collection model ----
jest.mock("../models/collectionsModel", () => {
    //Mock for .save()
    const CollectionMock = jest.fn().mockImplementation(function (data) {
        return {
            ...data,
            save: jest.fn().mockResolvedValue({_id: "1", ...data}),
        };
    });

    CollectionMock.find = jest.fn();
    CollectionMock.findById = jest.fn();
    CollectionMock.findByIdAndUpdate = jest.fn();
    CollectionMock.findByIdAndDelete = jest.fn();

    return { Collection: CollectionMock};
});

const { Collection } = require("../models/collectionsModel");
const {
  getAllCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection   
} = require("../controllers/collectionsController");

// ---- Build a small Express app for testing ----
const app = express();
app.use(express.json());
app.get("/collections", getAllCollections);
app.post("/collections", createCollection);
app.get("/collections/:id", getCollectionById);
app.put("/collections/:id", updateCollection);
app.delete("/collections/:id", deleteCollection);

// ---- Test suite ----
describe("Collectoins API (lighter tests)", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // ---- GET ALL ----
    test("GET /collections -> 200 success", async () => {
        const mockCollection = [{ id: 1, title: "Eternal" }];
        Collection.find.mockResolvedValue(mockCollection);

        const res = await supertest(app).get("/collections");

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockCollection);
    });

    // ---- POST ----
    test("POST /collections -> 201 success", async () => {
         {const newCollection = { title: "Earthy" };
         
         const res = await supertest(app).post("/collections").send(newCollection);

         expect(res.status).toBe(201);
         expect(res.body).toMatchObject(newCollection)};
    });

    // ---- GET BY ID ----
    test("GET /designer/:id -> 404 not found", async () => {
        Collection.findById.mockResolvedValue(null);

        const res = await supertest(app).get("/collections/doesnotexist");

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "No Collection found by that ID")
    })

    // ---- UPDATE ----
    test("PUT /collections/:id -> 200 success", async () => {
        Collection.findByIdAndUpdate.mockResolvedValue({ id: "1",  title: "Updated Title"});

        const res = await supertest(app)
            .put("/collections/1")
            .send({ title: "Updated Title" });
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Collection succesfully updated")
    })

     // ---- DELETE ----
     test("DELETE /collections/:id -> 404 not found", async () => {
        Collection.findByIdAndDelete.mockResolvedValue(null);

        const res = await supertest(app).delete("/collections/doesnotexist");

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "No Collection found by that ID");
     });
});