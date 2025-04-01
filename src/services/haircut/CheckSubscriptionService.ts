import prismaClient from "../../prisma";

export class CheckSubscriptionService {
  async execute(user_id: string) {
    const status = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        subscriptions: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });
    return status;
  }
}
