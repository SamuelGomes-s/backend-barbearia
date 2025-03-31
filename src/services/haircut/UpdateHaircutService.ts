import prismaClient from "../../prisma";

interface HaircutRequest {
  haircut_id: string;
  name: string;
  user_id: string;
  price: number;
  status: boolean | string;
}

export class UpdateHaircutService {
  async execute({
    haircut_id,
    name,
    price,
    user_id,
    status = true,
  }: HaircutRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        subscriptions: true,
      },
    });
    if (user?.subscriptions?.status !== "active") {
      throw new Error("Not authorized");
    }
    const haircut = await prismaClient.haircut.update({
      where: {
        id: haircut_id,
      },
      data: {
        name: name,
        price: price,
        status: status === true ? true : false,
      },
    });
    return haircut;
  }
}
