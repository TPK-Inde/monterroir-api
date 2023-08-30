import request from "supertest";
const app = require("../app");
import {VitrineRepository} from "../Lib/Repositories/VitrineRepository";
import {Vitrine} from "../models/Vitrine";
import sequelize from "../sequelize/db";

let newVitrine: Vitrine = sequelize.getRepository(Vitrine).build({
    ID_VITRINE: 1,
    ID_USER: 1,
    ID_CATEGORY_VITRINE: 1,
    ID_TYPE_VITRINE: 1,
    NAME: "Les choux de la ferme",
    IMAGE: "IMAGE_BASE_64",
    ADDRESS_STREET: "14 Rue du Général",
    ADDRESS_ZIP_CODE: "76600",
    ADDRESS_CITY: "Le Havre",
    DESCRIPTION: "Vendeur de choux depuis 10 ans",
    CREATION_DATE: new Date(),
    ACTIVATE: true,
    LATITUDE: 48.866667,
    LONGITUDE: 2.333333,
    DELETED: false,
    FAVORITE: false,
});

describe('Route GET - Vitrines', () => {

    jest.mock("../Lib/Repositories/VitrineRepository");

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    test("Récuperer toutes les vitrines actives", async () => {

        jest.spyOn(VitrineRepository.prototype, "GetAllActive").mockImplementation(async () => {
            return [newVitrine, newVitrine, newVitrine];
        });

        const res = await request(app)
            .get("/vitrines/active")
        expect(res.statusCode).toBe(200);
    });

    test("Récuperer toutes les vitrines - Non connecté", async () => {
        const res = await request(app)
            .get("/vitrines");

        expect(res.statusCode).toBe(401);
        expect(res.body).toBeDefined();
    });

    test("Récuperer toutes les vitrines - User", async () => {
        const res = await request(app)
            .get("/vitrines").set("Authorization", `Bearer ${process.env.TOKEN_USER}`);

        expect(res.statusCode).toBe(403);
        expect(res.body).toBeDefined();
    });

    test("Récuperer toutes les vitrines - Moderator", async () => {

        jest.spyOn(VitrineRepository.prototype, "GetAll").mockImplementation(async () => {
            return [newVitrine, newVitrine, newVitrine];
        });

        const res = await request(app)
            .get("/vitrines")
            .set("Authorization", `Bearer ${process.env.TOKEN_MODERATEUR}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
    });

    test("Récuperer toutes les vitrines - Admin", async () => {

        jest.spyOn(VitrineRepository.prototype, "GetAll").mockImplementation(async () => {
            return [newVitrine, newVitrine, newVitrine];
        });

        const res = await request(app)
            .get("/vitrines")
            .set("Authorization", `Bearer ${process.env.TOKEN_ADMIN}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
    });

    test("Récuperer toutes les vitrines - Super Admin", async () => {
        const res = await request(app)
            .get("/vitrines")
            .set("Authorization", `Bearer ${process.env.TOKEN_SUPER_ADMIN}`);

        expect(res.statusCode).toBe(403);
        expect(res.body).toBeDefined();
    });

    test("Récuperer une vitrine", async () => {

        jest.spyOn(VitrineRepository.prototype, "GetById").mockImplementation(async () => {
            return newVitrine;
        });

        const res = await request(app)
            .get("/vitrines/1")
            .set("Authorization", `Bearer ${process.env.TOKEN_ADMIN}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
    });

    test("Récuperer toutes les vitrines d'un utilisateur", async() => {

        jest.spyOn(VitrineRepository.prototype, "GetAllActive").mockImplementation(async () => {
            return [newVitrine, newVitrine, newVitrine];
        });

        const res = await request(app)
            .get("/vitrines/user/1");

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
    });

});

describe('Route Post - Vitrines', () => {

    jest.mock("../Lib/Repositories/VitrineRepository");

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    test("Créer une nouvelle vitrine - Non connecté", async () => {
        const res = await request(app)
            .post("/vitrines")
            .send(newVitrine);
        expect(res.statusCode).toBe(401);
    });

    test("Créer une nouvelle vitrine - Sans nom", async () => {
        const res = await request(app)
            .post("/vitrines")
            .set("Authorization", `Bearer ${process.env.TOKEN_ADMIN}`)
            .send({ ...newVitrine, NAME: "" });
        expect(res.statusCode).toBe(400);
    });

    test("Créer une nouvelle vitrine - User", async () => {

        jest.spyOn(VitrineRepository.prototype, "PostNewVitrine").mockImplementation(async () => {});

        const res = await request(app)
            .post("/vitrines")
            .set("Authorization", `Bearer ${process.env.TOKEN_USER}`)
            .send(newVitrine.toJSON());
        expect(res.statusCode).toBe(201);
    });

    test("Créer une nouvelle vitrine - Moderateur", async () => {

        jest.spyOn(VitrineRepository.prototype, "PostNewVitrine").mockImplementation(async () => {});

        const res = await request(app)
            .post("/vitrines")
            .set("Authorization", `Bearer ${process.env.TOKEN_MODERATEUR}`)
            .send(newVitrine.toJSON());
        expect(res.statusCode).toBe(201);
    });

    test("Créer une nouvelle vitrine - Admin", async () => {

        jest.spyOn(VitrineRepository.prototype, "PostNewVitrine").mockImplementation(async () => {});

        const res = await request(app)
            .post("/vitrines")
            .set("Authorization", `Bearer ${process.env.TOKEN_ADMIN}`)
            .send(newVitrine.toJSON());
        expect(res.statusCode).toBe(201);
    });

    test("Créer une nouvelle vitrine - Super admin", async () => {

        jest.spyOn(VitrineRepository.prototype, "PostNewVitrine").mockImplementation(async () => {});

        const res = await request(app)
            .post("/vitrines")
            .set("Authorization", `Bearer ${process.env.TOKEN_SUPER_ADMIN}`)
            .send(newVitrine.toJSON());
        expect(res.statusCode).toBe(201);
    });

});

describe("Route Put - Vitrines", () => {

    test("Modifier une vitrine", async () => {

        jest.spyOn(VitrineRepository.prototype, "GetAll").mockImplementation(async () => {
            return [newVitrine, newVitrine, newVitrine]
        });

        jest.spyOn(VitrineRepository.prototype, "PutVitrine").mockImplementation(async () => {});

        const allVitrines = await request(app)
            .get("/vitrines")
            .set("Authorization", `Bearer ${process.env.TOKEN_ADMIN}`);

        const res = await request(app)
            .put("/vitrines/" + allVitrines.body[allVitrines.body.length - 1].ID_VITRINE)
            .set("Authorization", `Bearer ${process.env.TOKEN_MODERATEUR}`)
            .send(allVitrines.body[0])

        expect(res.statusCode).toBe(204)
    });

});

describe("Route Delete - Vitrines", () => {

    test("Supprimer une vitrine", async () => {

        jest.spyOn(VitrineRepository.prototype, "GetById").mockImplementation(async () => {return newVitrine});
        jest.spyOn(VitrineRepository.prototype, "DeleteVitrine").mockImplementation(async () => {});

        const res = await request(app)
            .delete("/vitrines/1")
            .set("Authorization", `Bearer ${process.env.TOKEN_MODERATEUR}`)
        expect(res.statusCode).toBe(204)
    })

    test("Supprimer une vitrine - Id non trouvé", async () => {
        const res = await request(app)
            .delete("/vitrines/" + Math.round(Math.random()) * 100000)

        expect(res.statusCode).toBe(401);
    });
});