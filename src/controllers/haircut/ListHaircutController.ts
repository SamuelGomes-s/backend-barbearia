import { Request, Response } from "express";
import { ListHaircutService } from "../../services/haircut/ListHaircutController";

export class ListHaircutController {
  async handle(req: Request, res: Response) {
    const status = req.query.status as string;
    const user_id = req.user_id;
    const listHaircutService = new ListHaircutService();
    const haircut = await listHaircutService.execute({ user_id, status });
    return res.json(haircut);
  }
}
