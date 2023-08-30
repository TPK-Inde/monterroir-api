import { before } from 'node:test';
import supertest from 'supertest';
import request from 'supertest';
import Users from '../services/user';
import { UsersRepository } from "../Lib/Repositories/UsersRepository";
import { User } from '../models/User';
import sequelize from "../sequelize/db";

const app = require('../app');

const tokenUser = process.env.TOKEN_USER;
const tokenModerator = process.env.TOKEN_MODERATEUR;
const tokenAdmin = process.env.TOKEN_ADMIN;
const tokenSuperAdmin = process.env.TOKEN_SUPER_ADMIN;
const badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjoyMywiUFNFVURPTllNIjoiVXRpbGlzYXRldXJfTm9ybWFsIiwiSVNfTU9ERVJBVE9SIjpmYWxzZSwiSVNfQURNSU5JU1RSQVRPUiI6ZmFsc2UsIklTX1NVUEVSX0FETUlOSVNUUkFUT1IiOmZhbHNlLCJpYXQiOjE2OTMyMjc0NDh9.Bd485NEBKZGxIKxkpgSWW1iC49VB0rT3RbyHlziZB9N'

const date: Date = new Date();

const newUser: User = sequelize.getRepository(User).build({
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
})

jest.mock("../Lib/Repositories/UsersRepository");

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe("Route POST - users", () => {
    test("Post a new user", async () => {
        jest.spyOn(UsersRepository.prototype, "GetUserByEmail").mockImplementation(async () => {
            return null
        });

        jest.spyOn(UsersRepository.prototype, "GetUserByPseudonym").mockImplementation(async () => {
            return null
        });

        jest.spyOn(UsersRepository.prototype, "PostNewUser").mockImplementation(async () => { });

        const result = await request(app).post('/users').send(newUser.toJSON());
        expect(result.statusCode).toEqual(201);
    })

    test("POST a new user with same informations", async () => {
        jest.spyOn(UsersRepository.prototype, "GetUserByEmail").mockImplementation(async () => {
            return newUser;
        });

        const result = await request(app).post('/users').send(newUser.toJSON());
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
        const listUser: User[] = [newUser.toJSON(), newUser.toJSON(), newUser.toJSON()];

        jest.spyOn(UsersRepository.prototype, "GetAllUsers").mockImplementation(async () => {
            return listUser;
        });

        const result = await request(app).get('/users').set('Authorization', `Bearer ${tokenAdmin}`);
        expect(result.statusCode).toEqual(200);
        expect(JSON.stringify(listUser) == result.body);
    })

    it("Get all users when superAdmin", async () => {
        const listUser: User[] = [newUser.toJSON(), newUser.toJSON(), newUser.toJSON()];

        jest.spyOn(UsersRepository.prototype, "GetAllUsers").mockImplementation(async () => {
            return listUser;
        });

        const result = await request(app).get('/users').set('Authorization', `Bearer ${tokenSuperAdmin}`);
        expect(result.statusCode).toEqual(200);
        expect(JSON.stringify(listUser) == result.body);
    })

    it("Doesn't Get all if no token", async () => {
        const result = await request(app).get('/users').set('Authorization', `Bearer ${badToken}`);
        expect(result.statusCode).toEqual(403);
    })

    it("Get user by id but no user exist with this id", async () => {
        jest.spyOn(UsersRepository.prototype, "GetUserById").mockImplementation(async () => {
            return null;
        });

        const result = await request(app).get('/users/1').set('Authorization', `Bearer ${tokenAdmin}`);
        expect(result.statusCode).toEqual(204);
    })
})