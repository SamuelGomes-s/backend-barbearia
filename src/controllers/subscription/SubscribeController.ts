import { Request, Response } from "express";
import { SubscribeService } from "../../services/subscription/SubscribeService";

export class SubscribeController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const subscribeService = new SubscribeService();
    const subscribe = await subscribeService.execute({ user_id });
    return res.json(subscribe);
  }
}
