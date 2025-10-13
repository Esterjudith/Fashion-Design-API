const express = require("express");
const supertest = require("supertest");
const { designerRules, validateDesigner } = require("../designerValidation");

//Express app for testing
const app = express();
app.use(express.json());
app.post("/designers", designerRules, validateDesigner, (req, res) => {
    res.status(200).json({ success: true});
});

describe("Designer Validation Middleware", () => {
    // ---NAME---
    test("fails if name is too short", async () => {
        const res = await supertest(app).post("/designers").send({
            name: "A",
            birthYear: 1900,
            nationality: "FR",
            style: "Modern",
            famousFor: "Couture",
            activeYears: "1900–1950",
            awards: ["Best Designer"],
            website: "https://example.com",
        });
        expect(res.status).toBe(400);
        expect(res.body.errors[0].msg).toBe(
            "Designer name must be at least 2 characters, e.g. Li"
        );
    });

    //---BIRTH YEAR---
    test("fails if birth year is missing or invalid", async () => {
        const res = await supertest(app).post("/designers").send({
            name: "Coco Chanel",
            nationality: "FR",
            style: "Timeless",
            famousFor: "Little Black Dress",
            activeYears: "1900–1970",
            awards: ["Award"],
            website: "https://chanel.com",   
        });
        expect(res.status).toBe(400);
        expect(res.body.errors[0].msg).toBe("Enter a valid birth year.");
    });
     // --- WEBSITE ---
    test("fails if website is not a valid URL", async () => {
        const res = await supertest(app).post("/designers").send({
        name: "Coco Chanel",
        birthYear: 1883,
        nationality: "FR",
        style: "Timeless",
        famousFor: "Little Black Dress",
        activeYears: "1900–1970",
        awards: ["Award"],
        website: "not-a-url",
        });

        expect(res.status).toBe(400);
        expect(res.body.errors[0].msg).toBe("Website must be a valid URL.");
  });

    // --- VALID INPUT ---
  test("passes with valid data", async () => {
    const res = await supertest(app).post("/designers").send({
      name: "Coco Chanel",
      birthYear: 1883,
      nationality: "French",
      style: "Timeless elegance",
      famousFor: "The little black dress",
      activeYears: "1900–1970",
      awards: ["Neiman Marcus Fashion Award"],
      website: "https://chanel.com",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
})