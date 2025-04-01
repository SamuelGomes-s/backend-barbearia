import prismaClient from "../../prisma";

interface HaircutRequest {
  haircut_id: string;
}

export class DetailHaircutService {
  async execute({ haircut_id }: HaircutRequest) {
    const detail = await prismaClient.haircut.findFirst({
      where: {
        id: haircut_id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        status: true,
      },
    });
    return detail;
  }
}
