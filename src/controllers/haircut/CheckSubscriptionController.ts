import { Request, Response } from "express";
import { CheckSubscriptionService } from "../../services/haircut/CheckSubscriptionService";

export class CheckSubscriptionController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id
        const checkSubscriptionService = new CheckSubscriptionService()
        const check  = await checkSubscriptionService.execute(user_id)
        return res.json(check)
    }
}
