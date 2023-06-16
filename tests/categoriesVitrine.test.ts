// import { Response } from "express";
// import request from "supertest";
// import { CategoryVitrine } from "../models/CategoryVitrine";
// import { CategoryVitrineRepository } from "../Lib/Repositories/CategoryVitrineRepository";
// import CategoriesVitrine from "../services/categoriesVitrine";
// const app = require("../app");

// describe("Route - Catégories de vitrine", () => {
//   test("Récupérer toutes les catégories de vitrine", async () => {
//     const res = await request(app).get("/categoriesVitrine");
//     expect(res.statusCode).toEqual(200);
//   });
// });

///////////////////////////////////////////
//Avec Mock Sequelize

// const resultGetOne = jest.spyOn(CategoryVitrineRepository.prototype, 'GetById');

// describe("Route - Catégories de vitrine", () => {
//   test("Récupérer une catégorie de vitrine", async () => {



//     const res = await request(app).get("/categoriesVitrine");
//     expect(res.statusCode).toEqual(200);
//   });
// });

describe("Faux test unitaire", () => {
  test("Faux test unitaire", async () => {
    expect(true).toEqual(true);
  });
});