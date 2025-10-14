const express = require("express");
const supertest = require("supertest");

// Mock both models (Show + Collection)
jest.mock("../models/showsModel", () => {
  const mShow = function (data) {
    Object.assign(this, data);
  };
  mShow.prototype.save = jest.fn();

  // Mock static methods
  mShow.find = jest.fn();
  mShow.findById = jest.fn((id) => ({
    populate: jest.fn().mockResolvedValue(mShow.findById._mockReturnValue || null),
  }));
  mShow.findByIdAndUpdate = jest.fn();
  mShow.findByIdAndDelete = jest.fn();
  mShow.create = jest.fn();

  return { Show: mShow };
});

jest.mock("../models/collectionsModel", () => ({
  Collection: { findById: jest.fn() },
}));

const { Show } = require("../models/showsModel");
const { Collection } = require("../models/collectionsModel");
const {
  getAllShows,
  createShows,
  getshowById,
  updateShow,
  deleteShow,
} = require("../controllers/showsController");

// build mini app with all routes
const app = express();
app.use(express.json());
app.get("/shows", getAllShows);
app.post("/shows", createShows);
app.get("/shows/:id", getshowById);
app.put("/shows/:id", updateShow);
app.delete("/shows/:id", deleteShow);

describe("Shows API endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ---------------- GET ALL ----------------
  test("GET /shows → 200 success", async () => {
    const mockShows = [{ id: 1, location: "Paris FW" }];
    Show.find.mockResolvedValue(mockShows);

    const res = await supertest(app).get("/shows");

    expect(Show.find).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockShows);
  });

  test("GET /shows → 500 error", async () => {
    Show.find.mockRejectedValue(new Error("DB error"));

    const res = await supertest(app).get("/shows");

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "DB error");
  });

  // ---------------- POST ----------------
  test("POST /shows → 201 success", async () => {
    const newShow = {
      collectionId: "abc123",
      location: "NYFW",
      date: "2025-01-01",
      venue: "Madison Square Garden",
      specialGuests: ["Gigi"],
    };

    Collection.findById.mockResolvedValue(true); // collection exists
    Show.prototype.save = jest.fn().mockResolvedValue({ _id: "1", ...newShow });

    const res = await supertest(app).post("/shows").send(newShow);

    expect(Collection.findById).toHaveBeenCalledWith("abc123");
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newShow);
  });

  test("POST /shows → 400 collection not found", async () => {
    Collection.findById.mockResolvedValue(null);

    const res = await supertest(app).post("/shows").send({
      collectionId: "badid",
      location: "Nowhere",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Collection not found");
  });

  // ---------------- GET BY ID ----------------
  test("GET /shows/:id → 200 success", async () => {
  const mockShow = { id: "1", location: "Paris FW" };

  Show.findById.mockReturnValue({
    populate: jest.fn().mockResolvedValue(mockShow),
  });

  const res = await supertest(app).get("/shows/1");

  expect(Show.findById).toHaveBeenCalledWith("1");
  expect(res.status).toBe(200);
  expect(res.body).toEqual(mockShow);
});

test("GET /shows/:id → 400 not found", async () => {
  Show.findById.mockReturnValue({
    populate: jest.fn().mockResolvedValue(null),
  });

  const res = await supertest(app).get("/shows/doesnotexist");

  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty("message", "Show not found");
});
  // ---------------- UPDATE ----------------
  test("PUT /shows/:id → 200 success", async () => {
    Show.findByIdAndUpdate.mockResolvedValue({ id: "1", location: "Updated" });

    const res = await supertest(app)
      .put("/shows/1")
      .send({ location: "Updated" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Show successfully updated");
  });

  test("PUT /shows/:id → 404 not found", async () => {
    Show.findByIdAndUpdate.mockResolvedValue(null);

    const res = await supertest(app).put("/shows/doesnotexist").send({});

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "No Show found by that ID");
  });

  // ---------------- DELETE ----------------
  test("DELETE /shows/:id → 200 success", async () => {
    Show.findByIdAndDelete.mockResolvedValue({ id: "1" });

    const res = await supertest(app).delete("/shows/1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Show deleted successfully");
  });

  test("DELETE /shows/:id → 404 not found", async () => {
    Show.findByIdAndDelete.mockResolvedValue(null);

    const res = await supertest(app).delete("/shows/doesnotexist");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "No show found with this id");
  });
});
