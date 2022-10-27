import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

const createUsers = async () => {
  await prisma.user.createMany({
    data: [
      {
        username: "daniel",
        password: await argon2.hash("0000"),
        name: "Daniel",
        email: "daniel@example.com",
      },
      {
        username: "celso",
        password: await argon2.hash("0000"),
        name: "Celso",
        email: "celso@example.com",
      },
    ],
  });
};

const main = async () => {
  await createUsers();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
