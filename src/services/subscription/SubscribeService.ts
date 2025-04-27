import Stripe from "stripe";
import prismaClient from "../../prisma";

interface SubscribeRequest {
  user_id: string;
}

export class SubscribeService {
  async execute({ user_id }: SubscribeRequest) {
    if (!user_id) {
      throw new Error("User ID is required.");
    }
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
    if (!findUser) {
      throw new Error("User not found.");
    }
    let customerId = findUser?.subscription_id;
    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: findUser?.email,
      });
      await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          subscription_id: stripeCustomer.id,
        },
      });
      customerId = stripeCustomer.id;
    }
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: process.env.STRIPE_PRICE, quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });
    return { sessionId: stripeCheckoutSession.id };
  }
}
