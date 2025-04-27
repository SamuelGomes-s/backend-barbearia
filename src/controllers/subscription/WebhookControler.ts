import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../../utils/stripe/stripe";
import { saveSubscription } from "../../utils/subscription/manageSubscription";

export class WeebhookController {
  async handle(req: Request, res: Response) {
    let event: Stripe.Event = req.body;
    let endpointSecret: "whsec_2e5ebecfddef6c23d41f8dab0974cd337ec70a62066fa6f7a87aed2c594dc7a1";
    if (endpointSecret) {
      const signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (error) {
        console.log("Webhook  signature failed");
        return res.sendStatus(400);
      }
    }
    switch (event.type) {
      case "customer.subscription.deleted":
        const payment = event.data.object as Stripe.Subscription;
        await saveSubscription(
          payment.id,
          payment.customer.toString(),
          false,
          true
        );
        break;
      case "customer.subscription.updated":
        const paymentIntent = event.data.object as Stripe.Subscription;
        await saveSubscription(
          paymentIntent.id,
          paymentIntent.customer.toString(),
          false,
          false
        );
        break;
      case "checkout.session.completed":
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        await saveSubscription(
          checkoutSession.subscription.toString(),
          checkoutSession.customer.toString(),
          true,
          false
        );
        break;
      default:
        console.log(`Evento desconhecido ${event.type}`)
        break;
    }
    res.send();
  }
}
