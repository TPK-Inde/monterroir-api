// import request from "supertest";
// const app = require("../app");

// let newVitrine = {
//     ID_USER : 1,
//     ID_CATEGORY_VITRINE : 1,
//     ID_TYPE_VITRINE : 1,
//     NAME : "Name vitrine",
//     IMAGE : "Image vitrine",
//     ADDRESS_STREET : "Street vitrine",
//     ADDRESS_ZIP_CODE : "76800",
//     ADDRESS_CITY : "City vitrine",
//     DESCRIPTION : "Description vitrine",
//     CREATION_DATE : Date.now(),
//     ACTIVATE : false,
//     LATITUDE : 1,
//     LONGITUDE : 1
// };
// describe('Route GET - Vitrines', () => {

//     test("Récuperer toutes les vitrines actives", async () => {
//         const res = await request(app)
//             .get("/vitrines/active")
//             .set("Authorization", `Bearer ${process.env.TOKEN_ADMIN}`);

//         expect(res.statusCode).toBe(200);
//     });

//     test("Récuperer toutes les vitrines - Non connecté", async () => {
//         const res = await request(app)
//             .get("/vitrines");

//         expect(res.statusCode).toBe(401);
//         expect(res.body).toBeDefined();
//     });

//     test("Récuperer toutes les vitrines - User", async () => {
//         const res = await request(app)
//             .get("/vitrines").set("Authorization", `Bearer ${process.env.TOKEN_USER}`);

//         expect(res.statusCode).toBe(403);
//         expect(res.body).toBeDefined();
//     });

//     test("Récuperer toutes les vitrines - Moderator", async () => {
//         const res = await request(app)
//             .get("/vitrines")
//             .set("Authorization", `Bearer ${process.env.TOKEN_MODERATEUR}`);

//         expect(res.statusCode).toBe(200);
//         expect(res.body).toBeDefined();
//     });

//     test("Récuperer toutes les vitrines - Admin", async () => {
//         const res = await request(app)
//             .get("/vitrines")
//             .set("Authorization", `Bearer ${process.env.TOKEN_ADMIN}`);

//         expect(res.statusCode).toBe(200);
//         expect(res.body).toBeDefined();
//     });

//     test("Récuperer toutes les vitrines - Super Admin", async () => {
//         const res = await request(app)
//             .get("/vitrines")
//             .set("Authorization", `Bearer ${process.env.TOKEN_SUPER_ADMIN}`);

//         expect(res.statusCode).toBe(403);
//         expect(res.body).toBeDefined();
//     });

//     test("Récuperer une vitrine", async () => {
//         const allVitrines = await request(app)
//             .get("/vitrines/active");

//         const res = await request(app)
//             .get("/vitrines/" + allVitrines.body[0].ID_VITRINE)
//             .set("Authorization", `Bearer ${process.env.TOKEN_ADMIN}`);

//         expect(res.statusCode).toBe(200);
//         expect(res.body).toBeDefined();
//     });

//     test("Récuperer toutes les vitrines d'un utilisateur", async() => {
//         const users = await request(app)
//             .get("/users")
//             .set("Authorization", `Bearer ${process.env.TOKEN_ADMIN}`);

//         const res = await request(app)
//             .get("/vitrines/user/" + users.body[0].ID_USER);

//         expect(res.statusCode).toBe(200);
//         expect(res.body).toBeDefined();
//     });

// });

// describe('Route Post - Vitrines', () => {

//     test("Créer une nouvelle vitrine - Non connecté", async () => {
//         const res = await request(app)
//             .post("/vitrines")
//             .set("Authorization", `Bearer ${process.env.TOKEN_USER}`)
//             .send(newVitrine);
//         expect(res.statusCode).toBe(201);
//     });

//     test("Créer une nouvelle vitrine - User", async () => {
//         const res = await request(app)
//             .post("/vitrines")
//             .set("Authorization", `Bearer ${process.env.TOKEN_USER}`)
//             .send(newVitrine);
//         expect(res.statusCode).toBe(201);
//     });

//     test("Créer une nouvelle vitrine - Moderateur", async () => {
//         const res = await request(app)
//             .post("/vitrines")
//             .set("Authorization", `Bearer ${process.env.TOKEN_MODERATEUR}`)
//             .send(newVitrine);
//         expect(res.statusCode).toBe(201);
//     });

//     test("Créer une nouvelle vitrine - Admin", async () => {
//         const res = await request(app)
//             .post("/vitrines")
//             .set("Authorization", `Bearer ${process.env.TOKEN_ADMIN}`)
//             .send(newVitrine);
//         expect(res.statusCode).toBe(201);
//     });

//     test("Créer une nouvelle vitrine - Super admin", async () => {
//         const res = await request(app)
//             .post("/vitrines")
//             .set("Authorization", `Bearer ${process.env.TOKEN_SUPER_ADMIN}`)
//             .send(newVitrine);
//         expect(res.statusCode).toBe(201);
//     });

// });

// describe("Route Put - Vitrines", () => {

//     test("Modifier une vitrine", async () => {
//         const allVitrines = await request(app)
//             .get("/vitrines")
//             .set("Authorization", `Bearer ${process.env.TOKEN_ADMIN}`);

//         const res = await request(app)
//             .put("/vitrines/" + allVitrines.body[allVitrines.body.length - 1].ID_VITRINE)
//             .set("Authorization", `Bearer ${process.env.TOKEN_MODERATEUR}`)
//             .send(allVitrines.body[0])

//         expect(res.statusCode).toBe(204)
//     });

// });

// describe("Route Delete - Vitrines", () => {

//     test("Supprimer une vitrine", async () => {
//         const allVitrines = await request(app)
//             .get("/vitrines/active")
//             .set("Authorization", `Bearer ${process.env.TOKEN_ADMIN}`);

//         const res = await request(app)
//             .delete("/vitrines/" + allVitrines.body[allVitrines.body.length - 1].ID_VITRINE)
//             .set("Authorization", `Bearer ${process.env.TOKEN_MODERATEUR}`)
//         console.log(res)
//         expect(res.statusCode).toBe(204)
//     })

//     test("Supprimer une vitrine - Id non trouvé", async () => {
//         const res = await request(app)
//             .delete("/vitrines/" + Math.round(Math.random()) * 100000)

//         expect(res.statusCode).toBe(401);
//     });
// });