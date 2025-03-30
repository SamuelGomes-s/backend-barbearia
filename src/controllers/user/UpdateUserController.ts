import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { address, name } = req.body;
    const user_id = req.user_id;
    const updateUserService = new UpdateUserService();
    const user = await updateUserService.execute({ address, name, user_id });
    return res.json(user);
  }
}
