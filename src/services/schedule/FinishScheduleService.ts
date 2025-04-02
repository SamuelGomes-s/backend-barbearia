import prismaClient from "../../prisma";

interface ScheduleRequest {
  schedule_id: string;
  user_id: string;
}

export class FinishScheduleService {
  async execute({ schedule_id, user_id }: ScheduleRequest) {
    if (schedule_id === "" || user_id === "") {
      throw new Error("Error. ");
    }
    try {
      const scheduleUser = await prismaClient.service.findFirst({
        where: {
          id: schedule_id,
          user_id: user_id,
        },
      });
      if (!scheduleUser) {
        throw new Error("Not authorized.");
      }
      await prismaClient.service.delete({
        where: {
          id: schedule_id,
        },
      });
      return { message: "Finalizado com sucesso!" };
    } catch (error) {
      throw new Error("Error. ");
    }
  }
}
