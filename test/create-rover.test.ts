import supertest from "supertest";
import app from "../src/app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { CardinalDirectionEnum } from "../src/enums/cardinal-direction.enum";

describe('Create Rover Tests', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri())
        await supertest(app).post("/api/plateau").send({ x_size: 5, y_size: 5 });
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    it('Can create Rovers', async () => {
        const res = await supertest(app).post("/api/rover/create-many").send({
            data: [
                { coordinates: { x: 1, y: 2 }, direction: CardinalDirectionEnum.N, instructions: 'LMLMLMLMM' },
                { coordinates: { x: 3, y: 3 }, direction: CardinalDirectionEnum.S, instructions: 'RRMMML' },
            ]
        });

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);

        const rover1 = {
            x: res.body[0].x,
            y: res.body[0].y,
            direction: res.body[0].direction,
        };

        const rover2 = {
            x: res.body[1].x,
            y: res.body[1].y,
            direction: res.body[1].direction,
        };

        expect(rover1).toEqual({ x: 1, y: 1, direction: CardinalDirectionEnum.N });
        expect(rover2).toEqual({ x: 3, y: 0, direction: CardinalDirectionEnum.W });
    });

    it('Can land Rovers', async () => {
        const res = await supertest(app).post("/api/rover/create-many").send({
            data: [
                { coordinates: { x: 1, y: 2 }, direction: CardinalDirectionEnum.N, instructions: 'LMLMLMLMM' },
                { coordinates: { x: 3, y: 3 }, direction: CardinalDirectionEnum.S, instructions: 'RRMMML' },
            ]
        });

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);

        const rover1 = {
            x: res.body[0].x,
            y: res.body[0].y,
            direction: res.body[0].direction,
        };

        const rover2 = {
            x: res.body[1].x,
            y: res.body[1].y,
            direction: res.body[1].direction,
        };

        expect(rover1).toEqual({ x: 1, y: 1, direction: CardinalDirectionEnum.N });
        expect(rover2).toEqual({ x: 3, y: 0, direction: CardinalDirectionEnum.W });
    });

    it('Can\'t land Rovers outside plateau', async () => {
        const res = await supertest(app).post("/api/rover/create-many").send({
            data: [
                { coordinates: { x: 1, y: 2 }, direction: CardinalDirectionEnum.N, instructions: 'LMLMLMLMM' },
                { coordinates: { x: 3, y: 3 }, direction: CardinalDirectionEnum.S, instructions: 'RRMMML' },
                { coordinates: { x: 6, y: 6 }, direction: CardinalDirectionEnum.S, instructions: 'RRMMML' },
            ]
        });

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);

        const rover1 = {
            x: res.body[0].x,
            y: res.body[0].y,
            direction: res.body[0].direction,
        };

        const rover2 = {
            x: res.body[1].x,
            y: res.body[1].y,
            direction: res.body[1].direction,
        };

        expect(rover1).toEqual({ x: 1, y: 1, direction: CardinalDirectionEnum.N });
        expect(rover2).toEqual({ x: 3, y: 0, direction: CardinalDirectionEnum.W });
    });

    it('Cant move out of bounds to E', async () => {
        const res = await supertest(app).post("/api/rover/create-many").send({
            data: [
                { coordinates: { x: 1, y: 2 }, direction: CardinalDirectionEnum.N, instructions: 'RMMMMMMMMMMMM' },
            ]
        });

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);

        const rover1 = {
            x: res.body[0].x,
            y: res.body[0].y,
            direction: res.body[0].direction,
        };

        expect(rover1).toEqual({ x: 5, y: 2, direction: CardinalDirectionEnum.E });
    });

    it('Cant move out of bounds W', async () => {
        const res = await supertest(app).post("/api/rover/create-many").send({
            data: [
                { coordinates: { x: 1, y: 2 }, direction: CardinalDirectionEnum.N, instructions: 'LMMMMMMMMMMMM' },
            ]
        });

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);

        const rover1 = {
            x: res.body[0].x,
            y: res.body[0].y,
            direction: res.body[0].direction,
        };

        expect(rover1).toEqual({ x: 0, y: 2, direction: CardinalDirectionEnum.W });
    });

    it('Cant move out of bounds N', async () => {
        const res = await supertest(app).post("/api/rover/create-many").send({
            data: [
                { coordinates: { x: 1, y: 2 }, direction: CardinalDirectionEnum.W, instructions: 'RMMMMMMMMMMMM' },
            ]
        });

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);

        const rover1 = {
            x: res.body[0].x,
            y: res.body[0].y,
            direction: res.body[0].direction,
        };

        expect(rover1).toEqual({ x: 1, y: 0, direction: CardinalDirectionEnum.N });
    });

    it('Cant move out of bounds S', async () => {
        const res = await supertest(app).post("/api/rover/create-many").send({
            data: [
                { coordinates: { x: 1, y: 2 }, direction: CardinalDirectionEnum.W, instructions: 'LMMMMMMMMMMMM' },
            ]
        });

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);

        const rover1 = {
            x: res.body[0].x,
            y: res.body[0].y,
            direction: res.body[0].direction,
        };

        expect(rover1).toEqual({ x: 1, y: 5, direction: CardinalDirectionEnum.S });
    });
});
