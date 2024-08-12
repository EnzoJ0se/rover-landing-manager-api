import { Router } from "express";
import plateauController from "../controllers/plateau-controller";

const plateauRouter = Router();

plateauRouter.get("/", plateauController.get);

plateauRouter.get("/:id", plateauController.show);

plateauRouter.post("/", plateauController.create);

plateauRouter.put("/:id", plateauController.update);

export default plateauRouter;
