const express = require("express");
const supertest = require("supertest");
const { collectionRules, validateCollection } = require("../collectionValidation"); 

// Small Express app for testing validation
const app = express();
app.use(express.json());
app.post("/collections", collectionRules, validateCollection, (req, res) => {
  res.status(200).json({ success: true });
});

describe("Collection Validation Middleware", () => {
  // --- TITLE ---
  test("fails if title is too short", async () => {
    const res = await supertest(app).post("/collections").send({
      title: "A",
      season: "Spring",
      year: 2024,
      designer: "Dior",
      theme: "Luxury minimalism",
      description: "Clean lines and muted colors.",
      launchDate: "2024-05-01",
      numberOfPieces: 20,
      status: "active",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe(
      "Title must be at least 2 characters, e.g. Li"
    );
  });

  // --- YEAR ---
  test("fails if year is invalid", async () => {
    const res = await supertest(app).post("/collections").send({
      title: "Eternal Elegance",
      season: "Spring",
      year: 1500,
      designer: "Dior",
      theme: "Luxury minimalism",
      description: "Clean lines and muted colors.",
      launchDate: "2024-05-01",
      numberOfPieces: 20,
      status: "active",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe("Enter a valid year.");
  });

  // --- DATE ---
  test("fails if launchDate is not ISO8601", async () => {
    const res = await supertest(app).post("/collections").send({
      title: "Eternal Elegance",
      season: "Spring",
      year: 2024,
      designer: "Dior",
      theme: "Luxury minimalism",
      description: "Clean lines and muted colors.",
      launchDate: "05-01-2024", // wrong format
      numberOfPieces: 20,
      status: "active",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe("Enter a valid date (YYYY-MM-DD).");
  });

  // --- VALID INPUT ---
  test("passes with valid collection data", async () => {
    const res = await supertest(app).post("/collections").send({
      title: "Eternal Elegance",
      season: "Spring",
      year: 2024,
      designer: "Dior",
      theme: "Luxury minimalism",
      description: "Clean lines and muted colors.",
      launchDate: "2024-05-01",
      numberOfPieces: 20,
      status: "active",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
