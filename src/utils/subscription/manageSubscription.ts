import prismaClient from "../../prisma";
import { stripe } from "../stripe/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deleteAction = false
) {
  const findUser = await prismaClient.user.findFirst({
    where: {
      subscription_id: customerId,
    },
    include: {
      subscriptions: true,
    },
  });
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const subscriptionData = {
    id: subscription.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    user: {
      connect: {
        id: findUser.id,
      },
    },
  };
  if (createAction) {
    try {
      await prismaClient.subscription.create({
        data: subscriptionData,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    if (deleteAction) {
      await prismaClient.subscription.delete({
        where: {
          id: subscriptionId,
        },
      });
      return;
    }
    try {
      await prismaClient.subscription.update({
        where: {
          id: subscriptionId,
        },
        data: {
          status: subscription.status,
          priceId: subscription.items.data[0].price.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
