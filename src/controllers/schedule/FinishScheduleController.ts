import { Request, Response } from "express";
import { FinishScheduleService } from "../../services/schedule/FinishScheduleService";

export class FinishScheduleController {
  async handle(req: Request, res: Response) {
    const schedule_id = req.query.schedule_id as string;
    const user_id = req.user_id;
    const finishScheduleService = new FinishScheduleService();
    const finish = await finishScheduleService.execute({
      schedule_id,
      user_id,
    });
    return res.json(finish);
  }
}
