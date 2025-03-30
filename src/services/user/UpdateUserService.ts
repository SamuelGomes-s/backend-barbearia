import prismaClient from "../../prisma";

interface UserRequest {
  user_id: string;
  name: string;
  address: string;
}

export class UpdateUserService {
  async execute({ address, name, user_id }: UserRequest) {
    try {
      const userExist = await prismaClient.user.findFirst({
        where: {
          id: user_id,
        },
      });
      if (!userExist) {
        throw new Error("User not exists!");
      }
      const userUpdated = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          name: name,
          address: address,
        },
        select: {
          name: true,
          address: true,
          email: true,
        },
      });
      return userUpdated;
    } catch (error) {
      throw new Error("Error an update the user!");
    }
  }
}
