import request from "supertest";
const app = require("../app");

describe("Route GET - Catégories de vitrine", () => {
  test("Récupérer toutes les catégories de vitrine", async () => {
    const res = await request(app).get("/categoriesVitrine");

    expect(res.statusCode).toEqual(200);
  });

  test("Récupérer une catégorie de vitrine", async () => {
    const res = await request(app).get("/categoriesVitrine/1");

    expect(res.statusCode).toEqual(200);
  });
});