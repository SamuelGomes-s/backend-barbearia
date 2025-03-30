import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({ email, name, password }: UserRequest) {
    if (!email) {
      throw new Error("Email/password incorrect");
    }
    const userExist = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExist) {
      throw new Error("Email/password already exists");
    }
    const passwordHash = await hash(password, 8);
    const user = await prismaClient.user.create({
      data: {
        email: email,
        password: passwordHash,
        name: name,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }
}
