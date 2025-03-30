import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

//Rotas usuarios
router.post("/user", new CreateUserController().handle);

export { router };
