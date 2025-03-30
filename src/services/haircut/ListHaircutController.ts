import prismaClient from "../../prisma";

interface HaircutReques {
  user_id: string;
  status: string | boolean;
}

export class ListHaircutService {
  async execute({ status, user_id }: HaircutReques) {
    const haircut = await prismaClient.haircut.findMany({
      where: {
        id: user_id,
        status: status === "true" ? true : false,
      },
    });
    return haircut;
  }
}
