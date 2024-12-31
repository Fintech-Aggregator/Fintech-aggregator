<<<<<<< HEAD
import { prisma } from "@/prisma/prisma-client";
=======
// import { prisma } from "@/prisma/prisma-client";
>>>>>>> abad3ed7b78e68e398fce49c4004cd57dea15aaa
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  // await prisma.$executeRaw`TRUNCATE TABLE "HongKong" RESTART IDENTITY CASCADE;
  console.log(data)

<<<<<<< HEAD
  const hongKong = await prisma.hongKong.createMany({
    data: data,
  });

  return NextResponse.json(hongKong);
=======
  // const hongKong = await prisma.hongKong.createMany({
  //   data: data,
  // });

  return NextResponse.json(data);
>>>>>>> abad3ed7b78e68e398fce49c4004cd57dea15aaa
}
