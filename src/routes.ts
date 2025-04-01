import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutController";
import { CountHaircutController } from "./controllers/haircut/CountHaircutController";
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController";
import { CheckSubscriptionController } from "./controllers/haircut/CheckSubscriptionController";
import { CreateScheduleController } from "./controllers/schedule/CreateScheduleController";
import { ListScheduleController } from "./controllers/schedule/ListScheduleController";

const router = Router();

//Rotas usuarios
router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.put("/user/update", isAuthenticated, new UpdateUserController().handle);

//Rotas corte
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle);
router.get("/haircuts", isAuthenticated, new ListHaircutController().handle);
router.put("/haircut", isAuthenticated, new UpdateHaircutController().handle);
router.get(
  "/haircuts/count",
  isAuthenticated,
  new CountHaircutController().handle
);
router.get(
  "/haircut/check",
  isAuthenticated,
  new CheckSubscriptionController().handle
);
router.get(
  "/haircut/detail",
  isAuthenticated,
  new DetailHaircutController().handle
);

//Rotas serviços
router.post(
  "/schedule",
  isAuthenticated,
  new CreateScheduleController().handle
);
router.get("/schedules", isAuthenticated, new ListScheduleController().handle);

export { router };
