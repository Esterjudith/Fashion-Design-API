const express = require("express");
const supertest = require("supertest");
const { showRules, validateShow } = require("../showValidation"); 

// Build a tiny express app for testing
const app = express();
app.use(express.json());
app.post("/shows", showRules, validateShow, (req, res) => {
  res.status(200).json({ success: true });
});

describe("Show Validation Middleware", () => {
  // --- COLLECTION ID ---
  test("fails if collectionId is missing", async () => {
    const res = await supertest(app).post("/shows").send({
      location: "Paris Fashion Week",
      date: "2025-03-10",
      venue: "Grand Palais",
      specialGuests: ["Gigi Hadid"],
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe("Collection ID is required.");
  });

  // --- DATE ---
  test("fails if date is not ISO8601", async () => {
    const res = await supertest(app).post("/shows").send({
      collectionId: "abc123",
      location: "Paris Fashion Week",
      date: "03-10-2025", // wrong format
      venue: "Grand Palais",
      specialGuests: ["Gigi Hadid"],
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe("Date must be valid (YYYY-MM-DD).");
  });

  // --- SPECIAL GUESTS ---
  test("fails if specialGuests is not an array", async () => {
    const res = await supertest(app).post("/shows").send({
      collectionId: "abc123",
      location: "Paris Fashion Week",
      date: "2025-03-10",
      venue: "Grand Palais",
      specialGuests: "Gigi Hadid", // wrong type
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe("Special guests must be an array of strings.");
  });

  // --- VALID INPUT ---
  test("passes with valid show data", async () => {
    const res = await supertest(app).post("/shows").send({
      collectionId: "abc123",
      location: "Paris Fashion Week",
      date: "2025-03-10",
      venue: "Grand Palais",
      specialGuests: ["Gigi Hadid", "Bella Hadid"],
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
