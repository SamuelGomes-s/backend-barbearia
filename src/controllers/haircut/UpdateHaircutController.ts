import { Request, Response } from "express";
import { UpdateHaircutService } from "../../services/haircut/UpdateHaircutService";

export class UpdateHaircutController {
  async handle(req: Request, res: Response) {
    const { haircut_id, price, name, status } = req.body;
    const user_id = req.user_id;
    const updateHaircutService = new UpdateHaircutService();
    const haircut = await updateHaircutService.execute({
      haircut_id,
      name,
      price,
      status,
      user_id,
    });
    return res.json(haircut);
  }
}
