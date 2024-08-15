import express, { Express, Request, Response } from "express";
import appRouter from "./routes/app-router";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use("/api", appRouter);
app.get("/", (req: Request, res: Response) => res.send("API is running..."));

export default app;

