import request from "supertest";
import { CategoryVitrineRepository } from "../Lib/Repositories/CategoryVitrineRepository";
import sequelize from "../sequelize/db";
import { CategoryVitrine } from "../models/CategoryVitrine";

const app = require("../app");

describe("Catégorie de vitrine", () => {
  const nouvelleCategorieVitrine: CategoryVitrine = sequelize.getRepository(CategoryVitrine).build({
    ID_CATEGORY_VITRINE: 10,
    WORDING: "NouvelleCategorie"
  });

  const nouvelleCategorieVitrineUpdate: CategoryVitrine = sequelize.getRepository(CategoryVitrine).build({
    WORDING: "NouvelleCategorieUpdate"
  });

  const nouvelleCategorieVitrineEchec: CategoryVitrine = sequelize.getRepository(CategoryVitrine).build({
    WORDING: ""
  });

  describe("Route CREATE", () => {
    test("Ajout d'une catégorie de vitrine - SuperAdministrateur", async () => {
      jest.spyOn(CategoryVitrineRepository.prototype, "PostNewCategoryVitrine").mockImplementation(async () => { });

      const res = await request(app).post("/categoriesVitrine").set('Authorization', `Bearer ${process.env.TOKEN_SUPER_ADMIN}`).send(nouvelleCategorieVitrine.toJSON());
      expect(res.statusCode).toEqual(201);
    })

    test("Ajout d'une catégorie de vitrine - Administrateur", async () => {
      const res = await request(app).post("/categoriesVitrine").set('Authorization', `Bearer ${process.env.TOKEN_ADMIN}`).send(nouvelleCategorieVitrine.toJSON());
      expect(res.statusCode).toEqual(403);
    })

    test("Ajout d'une catégorie de vitrine - Modérateur", async () => {
      const res = await request(app).post("/categoriesVitrine").set('Authorization', `Bearer ${process.env.TOKEN_MODERATEUR}`).send(nouvelleCategorieVitrine.toJSON());
      expect(res.statusCode).toEqual(403);
    })

    test("Ajout d'une catégorie de vitrine - Utilisateur", async () => {
      const res = await request(app).post("/categoriesVitrine").set('Authorization', `Bearer ${process.env.TOKEN_USER}`).send(nouvelleCategorieVitrine.toJSON());
      expect(res.statusCode).toEqual(403);
    })

    test("Ajout d'une catégorie de vitrine - Non authentifié", async () => {
      const res = await request(app).post("/categoriesVitrine").send(nouvelleCategorieVitrine).send(nouvelleCategorieVitrine.toJSON());
      expect(res.statusCode).toEqual(401);
    })

    test("Catégorie de vitrine incorrect - SuperAdministrateur", async () => {
      const res = await request(app).post("/categoriesVitrine").set('Authorization', `Bearer ${process.env.TOKEN_SUPER_ADMIN}`).send(nouvelleCategorieVitrineEchec.toJSON());
      expect(res.statusCode).toEqual(400);
    })
  });

  describe("Route GET", () => {
    test("Récupérer toutes les catégories de vitrine", async () => {
      const listCategorieVitrine: CategoryVitrine[] = [nouvelleCategorieVitrine, nouvelleCategorieVitrine, nouvelleCategorieVitrine];

      jest.spyOn(CategoryVitrineRepository.prototype, "GetAll").mockImplementation(async () => { return listCategorieVitrine });

      const res = await request(app).get("/categoriesVitrine");
      expect(res.statusCode).toEqual(200);
      expect(JSON.stringify(listCategorieVitrine) == res.body);
    });

    test("Récupérer une catégorie de vitrine", async () => {
      const categoryVitrine: CategoryVitrine = nouvelleCategorieVitrine;

      jest.spyOn(CategoryVitrineRepository.prototype, "GetById").mockImplementation(async () => { return nouvelleCategorieVitrine });

      const res = await request(app).get("/categoriesVitrine/1");
      expect(res.statusCode).toEqual(200);
      expect(JSON.stringify(categoryVitrine) == res.body);
    });

    test("Argument invalide sur le get", async () => {
      const res = await request(app).get("/categoriesVitrine/a");

      expect(res.statusCode).toEqual(400);
    });
  });

  describe("Route UPDATE", () => {
    test("Modification d'une catégorie de vitrine - Administrateur", async () => {
      const res = await request(app).put("/categoriesVitrine/10").set('Authorization', `Bearer ${process.env.TOKEN_ADMIN}`).send(nouvelleCategorieVitrineUpdate.toJSON());
      expect(res.statusCode).toEqual(403);
    })

    test("Modification d'une catégorie de vitrine - Modérateur", async () => {
      const res = await request(app).put("/categoriesVitrine/10").set('Authorization', `Bearer ${process.env.TOKEN_MODERATEUR}`).send(nouvelleCategorieVitrineUpdate.toJSON());
      expect(res.statusCode).toEqual(403);
    })

    test("Modification d'une catégorie de vitrine - Utilisateur", async () => {
      const res = await request(app).put("/categoriesVitrine/10").set('Authorization', `Bearer ${process.env.TOKEN_USER}`).send(nouvelleCategorieVitrineUpdate.toJSON());
      expect(res.statusCode).toEqual(403);
    })

    test("Modification d'une catégorie de vitrine - Non authentifié", async () => {
      const res = await request(app).put("/categoriesVitrine/10").send(nouvelleCategorieVitrineUpdate).send(nouvelleCategorieVitrineUpdate.toJSON());
      expect(res.statusCode).toEqual(401);
    })

    test("Modification d'une catégorie de vitrine - SuperAdministrateur", async () => {
      jest.spyOn(CategoryVitrineRepository.prototype, "PutCategoryVitrine").mockImplementation(async () => { });

      const res = await request(app).put("/categoriesVitrine/10").set('Authorization', `Bearer ${process.env.TOKEN_SUPER_ADMIN}`).send(nouvelleCategorieVitrineUpdate.toJSON());
      expect(res.statusCode).toEqual(200);
    })

    test("Catégorie de vitrine incorrect - SuperAdministrateur", async () => {
      const res = await request(app).put("/categoriesVitrine/10").set('Authorization', `Bearer ${process.env.TOKEN_SUPER_ADMIN}`).send(nouvelleCategorieVitrineEchec.toJSON());
      expect(res.statusCode).toEqual(400);
    })
  });

  describe("Route DELETE", () => {
    test("Suppression d'une catégorie de vitrine - Administrateur", async () => {
      const res = await request(app).delete("/categoriesVitrine/10").set('Authorization', `Bearer ${process.env.TOKEN_ADMIN}`);
      expect(res.statusCode).toEqual(403);
    })

    test("Suppression d'une catégorie de vitrine - Modérateur", async () => {
      const res = await request(app).delete("/categoriesVitrine/10").set('Authorization', `Bearer ${process.env.TOKEN_MODERATEUR}`);
      expect(res.statusCode).toEqual(403);
    })

    test("Suppression d'une catégorie de vitrine - Utilisateur", async () => {
      const res = await request(app).delete("/categoriesVitrine/10").set('Authorization', `Bearer ${process.env.TOKEN_USER}`);
      expect(res.statusCode).toEqual(403);
    })

    test("Suppression d'une catégorie de vitrine - Non authentifié", async () => {
      const res = await request(app).delete("/categoriesVitrine/10");
      expect(res.statusCode).toEqual(401);
    })

    test("Suppression d'une catégorie de vitrine - SuperAdministrateur", async () => {
      jest.spyOn(CategoryVitrineRepository.prototype, "DeleteCategoryVitrine").mockImplementation(async () => { return 1 });

      const res = await request(app).delete("/categoriesVitrine/10").set('Authorization', `Bearer ${process.env.TOKEN_SUPER_ADMIN}`);
      expect(res.statusCode).toEqual(200);
    })

    test("Paramètre incorrect (ID) - SuperAdministrateur", async () => {
      const res = await request(app).delete("/categoriesVitrine/a").set('Authorization', `Bearer ${process.env.TOKEN_SUPER_ADMIN}`);
      expect(res.statusCode).toEqual(400);
    })
  });
})