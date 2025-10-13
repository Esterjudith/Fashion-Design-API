const express = require("express");
const supertest = require("supertest");
const { brandRules, validateBrand } = require("../brandValidation"); 

// small app for testing validation only
const app = express();
app.use(express.json());
app.post("/brands", brandRules, validateBrand, (req, res) => {
  res.status(200).json({ success: true });
});

describe("Brand Validation Middleware", () => {
  // --- NAME ---
  test("fails if brand name is missing", async () => {
    const res = await supertest(app).post("/brands").send({
      founder: "Ralph Lauren",
      foundedYear: 1967,
      headquarters: "New York",
      specialization: "Clothing",
      currentCreativeDirector: "David Lauren",
      notableCollections: ["Polo"],
      slogan: "Classic Style",
      website: "https://ralphlauren.com",
      status: "active",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe("Brand name is required.");
  });

  // --- FOUNDER ---
  test("fails if founder name is too short", async () => {
    const res = await supertest(app).post("/brands").send({
      name: "RL",
      founder: "R",
      foundedYear: 1967,
      headquarters: "New York",
      specialization: "Clothing",
      currentCreativeDirector: "David Lauren",
      notableCollections: ["Polo"],
      slogan: "Classic Style",
      website: "https://ralphlauren.com",
      status: "active",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe(
      "Founder must be at least 2 characters, e.g. Li"
    );
  });

  // --- WEBSITE ---
  test("fails if website is not a valid URL", async () => {
    const res = await supertest(app).post("/brands").send({
      name: "Ralph Lauren",
      founder: "Ralph Lauren",
      foundedYear: 1967,
      headquarters: "New York",
      specialization: "Clothing",
      currentCreativeDirector: "David Lauren",
      notableCollections: ["Polo"],
      slogan: "Classic Style",
      website: "not-a-url",
      status: "active",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe("Website must be a valid URL.");
  });

  // --- VALID INPUT ---
  test("passes with valid brand data", async () => {
    const res = await supertest(app).post("/brands").send({
      name: "Ralph Lauren",
      founder: "Ralph Lauren",
      foundedYear: 1967,
      headquarters: "New York",
      specialization: "Clothing",
      currentCreativeDirector: "David Lauren",
      notableCollections: ["Polo"],
      slogan: "Classic Style",
      website: "https://ralphlauren.com",
      status: "active",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});