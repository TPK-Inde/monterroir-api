import { before } from 'node:test';
import supertest from 'supertest';
import request from 'supertest';
const app = require('../app');

type User = {
    ID_USER: number;
    ID_ACCOUNT_STATUS: number;
    FIRST_NAME: string;
    LAST_NAME: string;
    PSEUDONYM: string;
    PROFIL_PICTURE: string;
    PASSWORD: string;
    EMAIL: string;
    DATE_OF_BIRTH: Date;
    ADDRESS_CITY: string;
    ADDRESS_STREET: string;
    ADDRESS_ZIP_CODE: string;
}

const tokenUser = process.env.TOKEN_USER;
const tokenModerator = process.env.TOKEN_MODERATEUR;
const tokenAdmin = process.env.TOKEN_ADMIN;
const tokenSuperAdmin = process.env.TOKEN_SUPER_ADMIN;
const badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjoyMywiUFNFVURPTllNIjoiVXRpbGlzYXRldXJfTm9ybWFsIiwiSVNfTU9ERVJBVE9SIjpmYWxzZSwiSVNfQURNSU5JU1RSQVRPUiI6ZmFsc2UsIklTX1NVUEVSX0FETUlOSVNUUkFUT1IiOmZhbHNlLCJpYXQiOjE2OTMyMjc0NDh9.Bd485NEBKZGxIKxkpgSWW1iC49VB0rT3RbyHlziZB9N'


describe("Route POST - users", () => {

    const date: Date = new Date();

    const newUser: User = {
        ID_USER: 666,
        ID_ACCOUNT_STATUS: 1,
        PSEUDONYM: "le sabre de Dieu",
        LAST_NAME: "Kill",
        FIRST_NAME: "Bill",
        DATE_OF_BIRTH: date,
        EMAIL: "test45120@exemple.com",
        ADDRESS_STREET: '55, rue de la victoire',
        ADDRESS_ZIP_CODE: '76197',
        ADDRESS_CITY: 'Bourg-monluc',
        PROFIL_PICTURE: 'image/2023/12/example.png',
        PASSWORD: '123AzertyMesCouillesEnSki@'
    }

    it("Post a new user", async () => {
        const result = await request(app).post('/users').send(newUser);
        expect(result.statusCode).toEqual(201);
    })

    it("POST a new user with same informations", async () => {
        const result = await request(app).post('/users').send(newUser);
        expect(result.statusCode).toEqual(400);
    })
})


describe("Route Get - users", () => {


    it("Cannot Get all users when moderator", async () => {
        const result = await request(app).get('/users').set('Authorization', `Bearer ${tokenModerator}`);
        expect(result.statusCode).toEqual(403);
    })

    it("Cannot get all users when is User", async () => {
        const result = await request(app).get('/users').set('Authorization', `Bearer ${tokenUser}`);
        expect(result.statusCode).toEqual(403);
    })

    it("Get all users when admin", async () => {
        const result = await request(app).get('/users').set('Authorization', `Bearer ${tokenAdmin}`);
        expect(result.statusCode).toEqual(200);
    })

    it("Get all users when superAdmin", async () => {
        const result = await request(app).get('/users').set('Authorization', `Bearer ${tokenSuperAdmin}`);
        expect(result.statusCode).toEqual(200);
    })

    it("Doesn't Get all if no token", async () => {
        const result = await request(app).get('/users').set('Authorization', `Bearer ${badToken}`);
        expect(result.statusCode).toEqual(403);
    })

    it("Get user by id but no user exist with this id", async () => {
        const result = await request(app).get('/users/100').set('Authorization', `Bearer ${tokenAdmin}`);
        expect(result.statusCode).toEqual(204);
    })

})