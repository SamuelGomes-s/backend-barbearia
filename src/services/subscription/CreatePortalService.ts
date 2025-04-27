import Stripe from "stripe";
import prismaClient from "../../prisma";

interface CreatePortalRequest {
  user_id: string;
}

export class CreatePortalService {
  async execute({ user_id }: CreatePortalRequest) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: "2025-03-31.basil",
      appInfo: {
        name: "BarberPro",
        version: "1",
      },
    });
    const findUser = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    let sessionId = findUser.subscription_id;
    if (!sessionId) {
      return { message: "User not found" };
    }
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sessionId,
      return_url: process.env.STRIPE_SUCCESS_URL,
    });
    return { sessionId: portalSession.url };
  }
}
