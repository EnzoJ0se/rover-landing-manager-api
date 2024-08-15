import supertest from "supertest";
import app from "../src/app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

describe('Plateau Tests', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri())
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    it('Can create plateau', async () => {
        const res = await supertest(app).post("/api/plateau").send({ x_size: 5, y_size: 5 });

        expect(res.status).toBe(200);
    });

    it('Can\'t create plateau with negative values', async () => {
        const res = await supertest(app).post("/api/plateau").send({ x_size: -1, y_size: 1 });

        expect(res.status).toBe(400);
    });

    it('Can\'t create plateau with zeroed values', async () => {
        const res = await supertest(app).post("/api/plateau").send({ x_size: 10, y_size: 0 });

        expect(res.status).toBe(400);
    });
});
