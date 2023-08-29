import request from "supertest";
const app = require("../app");

beforeAll(async () => {
  //Permet de détruire et remonter la base de données (Non fonctionnel)
  // //Drop and restore database
  // var fs = require('fs');
  // var allSqlContent = fs.readFileSync('./tests/sql/DatabaseForTest.sql', 'utf-8');

  // const mariadb = require('mariadb');
  // const pool = mariadb.createPool({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });

  // var conn = await pool.getConnection();
  // allSqlContent.split(/\r?\n/).forEach(async (line: any) => {
  //   try {
  //     await conn.execute(line, function (err: any, result: any) { if (err) throw err; console.log(result); });
  //   }
  //   catch (error: any) {
  //     console.log(error);
  //   }
  // });

  // conn.end();
})

describe("Catégorie de vitrine", () => {
  const nouvelleCategorieVitrine = {
    ID_CATEGORY_VITRINE: 666,
    WORDING: "NouvelleCategorie"
  }

  const nouvelleCategorieVitrineUpdate = {
    WORDING: "NouvelleCategorieUpdate"
  }

  const nouvelleCategorieVitrineEchec = {
    WORDING: ""
  }

  describe("Route CREATE", () => {
    test("Ajout d'une catégorie de vitrine - SuperAdministrateur", async () => {
      const res = await request(app).post("/categoriesVitrine").set('Authorization', `Bearer ${process.env.TOKEN_SUPER_ADMIN}`).send(nouvelleCategorieVitrine);
      console.log(res.statusCode);
      console.log(res.body);

      expect(res.statusCode).toEqual(201);
    })

    test("Ajout d'une catégorie de vitrine - Administrateur", async () => {
      const res = await request(app).post("/categoriesVitrine").set('Authorization', `Bearer ${process.env.TOKEN_ADMIN}`).send(nouvelleCategorieVitrine);
      expect(res.statusCode).toEqual(403);
    })

    test("Ajout d'une catégorie de vitrine - Modérateur", async () => {
      const res = await request(app).post("/categoriesVitrine").set('Authorization', `Bearer ${process.env.TOKEN_MODERATEUR}`).send(nouvelleCategorieVitrine);
      expect(res.statusCode).toEqual(403);
    })

    test("Ajout d'une catégorie de vitrine - Utilisateur", async () => {
      const res = await request(app).post("/categoriesVitrine").set('Authorization', `Bearer ${process.env.TOKEN_USER}`).send(nouvelleCategorieVitrine);
      expect(res.statusCode).toEqual(403);
    })

    test("Ajout d'une catégorie de vitrine - Non authentifié", async () => {
      const res = await request(app).post("/categoriesVitrine").send(nouvelleCategorieVitrine).send(nouvelleCategorieVitrine);
      expect(res.statusCode).toEqual(401);
    })

    test("Catégorie de vitrine incorrect - SuperAdministrateur", async () => {
      const res = await request(app).post("/categoriesVitrine").set('Authorization', `Bearer ${process.env.TOKEN_SUPER_ADMIN}`).send(nouvelleCategorieVitrineEchec);
      expect(res.statusCode).toEqual(400);
    })
  });

  describe("Route GET", () => {
    test("Récupérer toutes les catégories de vitrine", async () => {
      const res = await request(app).get("/categoriesVitrine");

      expect(res.statusCode).toEqual(200);
    });

    test("Récupérer une catégorie de vitrine", async () => {
      const res = await request(app).get("/categoriesVitrine/1");

      expect(res.statusCode).toEqual(200);
    });

    test("Argument invalide sur le get", async () => {
      const res = await request(app).get("/categoriesVitrine/a");

      expect(res.statusCode).toEqual(400);
    });
  });

  describe("Route UPDATE", () => {
    test("Modification d'une catégorie de vitrine - Administrateur", async () => {
      const res = await request(app).put("/categoriesVitrine/666").set('Authorization', `Bearer ${process.env.TOKEN_ADMIN}`).send(nouvelleCategorieVitrineUpdate);
      expect(res.statusCode).toEqual(403);
    })

    test("Modification d'une catégorie de vitrine - Modérateur", async () => {
      const res = await request(app).put("/categoriesVitrine/666").set('Authorization', `Bearer ${process.env.TOKEN_MODERATEUR}`).send(nouvelleCategorieVitrineUpdate);
      expect(res.statusCode).toEqual(403);
    })

    test("Modification d'une catégorie de vitrine - Utilisateur", async () => {
      const res = await request(app).put("/categoriesVitrine/666").set('Authorization', `Bearer ${process.env.TOKEN_USER}`).send(nouvelleCategorieVitrineUpdate);
      expect(res.statusCode).toEqual(403);
    })

    test("Modification d'une catégorie de vitrine - Non authentifié", async () => {
      const res = await request(app).put("/categoriesVitrine/666").send(nouvelleCategorieVitrineUpdate).send(nouvelleCategorieVitrineUpdate);
      expect(res.statusCode).toEqual(401);
    })

    test("Modification d'une catégorie de vitrine - SuperAdministrateur", async () => {
      const res = await request(app).put("/categoriesVitrine/666").set('Authorization', `Bearer ${process.env.TOKEN_SUPER_ADMIN}`).send(nouvelleCategorieVitrineUpdate);
      expect(res.statusCode).toEqual(200);
    })

    test("Catégorie de vitrine incorrect - SuperAdministrateur", async () => {
      const res = await request(app).put("/categoriesVitrine/666").set('Authorization', `Bearer ${process.env.TOKEN_SUPER_ADMIN}`).send(nouvelleCategorieVitrineEchec);
      expect(res.statusCode).toEqual(400);
    })
  });

  describe("Route DELETE", () => {
    test("Suppression d'une catégorie de vitrine - Administrateur", async () => {
      const res = await request(app).delete("/categoriesVitrine/666").set('Authorization', `Bearer ${process.env.TOKEN_ADMIN}`);
      expect(res.statusCode).toEqual(403);
    })

    test("Suppression d'une catégorie de vitrine - Modérateur", async () => {
      const res = await request(app).delete("/categoriesVitrine/666").set('Authorization', `Bearer ${process.env.TOKEN_MODERATEUR}`);
      expect(res.statusCode).toEqual(403);
    })

    test("Suppression d'une catégorie de vitrine - Utilisateur", async () => {
      const res = await request(app).delete("/categoriesVitrine/666").set('Authorization', `Bearer ${process.env.TOKEN_USER}`);
      expect(res.statusCode).toEqual(403);
    })

    test("Suppression d'une catégorie de vitrine - Non authentifié", async () => {
      const res = await request(app).delete("/categoriesVitrine/666");
      expect(res.statusCode).toEqual(401);
    })

    test("Suppression d'une catégorie de vitrine - SuperAdministrateur", async () => {
      const res = await request(app).delete("/categoriesVitrine/666").set('Authorization', `Bearer ${process.env.TOKEN_SUPER_ADMIN}`);
      expect(res.statusCode).toEqual(200);
    })
  });
})