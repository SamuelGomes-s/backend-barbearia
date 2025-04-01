import prismaClient from "../../prisma";

interface ScheduleRequest {
  user_id: string;
  haircut_id: string;
  customer: string;
}

export class CreateScheduleService {
  async execute({ customer, haircut_id, user_id }: ScheduleRequest) {
    if (customer === "" || haircut_id === "") {
      throw new Error("Error schedule new service.");
    }
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        haircuts: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const haircut = user.haircuts.find((item) => item.id === haircut_id);
    if (!haircut) {
      throw new Error("Haircut not found for this user");
    }
    const schedule = await prismaClient.service.create({
      data: {
        customer: customer,
        haircut_id: haircut_id,
        user_id: user_id,
      },
    });
    return schedule;
  }
}
