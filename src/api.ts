import express, { Express, Request, Response } from "express";
import { environment } from "./environment/environment";
import appRouter from "./routes/app-router";
import cors from "cors";

const app: Express = express();
const port = environment.port;

app.use(cors());
app.use("/api", appRouter);
app.get("/", (req: Request, res: Response) => res.send("API is running..."));

app.listen(port, () => console.log(`[server]: Server is running at http://localhost:${port}`));

