import { Request, Response } from "express";
import { CreateScheduleService } from "../../services/schedule/CreateScheduleService";

export class CreateScheduleController {
  async handle(req: Request, res: Response) {
    const { haircut_id, customer } = req.body;
    const user_id = req.user_id;
    const createScheduleService = new CreateScheduleService();
    const schedule = await createScheduleService.execute({
      customer,
      haircut_id,
      user_id,
    });
    return res.json(schedule);
  }
}
