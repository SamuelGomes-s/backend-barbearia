import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";

const router = Router();

//Rotas usuarios
router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.put("/user/update", isAuthenticated, new UpdateUserController().handle);

//Rotas corte
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle);

export { router };
