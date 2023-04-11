import request from "supertest";
const app = require("../app");

describe("Route - Catégories de vitrine", () => {
  test("Récupérer toutes les catégories de vitrine", async () => {
    const res = await request(app).get("/categoriesVitrine");
    expect(res.statusCode).toEqual(200);
  });
});