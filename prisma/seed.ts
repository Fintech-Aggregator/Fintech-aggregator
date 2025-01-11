import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

async function up() {
  const payload1 = { userId: 1 };
  const payload2 = { userId: 2 };
  const secretKey = process.env.JWT_SECRET;
  const token1 = jwt.sign(payload1, secretKey!, { expiresIn: "5d" });
  const token2 = jwt.sign(payload2, secretKey!, { expiresIn: "5d" });
  await prisma.user.createMany({
    data: [
      {
        fullName: "Test Admin",
        email: "user@gmail.com",
        token: token1,
        password: hashSync("111111", 10),
        role: "USER",
      },
      {
        fullName: "Test User",
        email: "admin@@gmail.com",
        token: token2,
        password: hashSync("111111", 10),
        role: "ADMIN",
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
