import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { email, password, name } = req.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ email, name, password });
    return res.json(user);
  }
}
