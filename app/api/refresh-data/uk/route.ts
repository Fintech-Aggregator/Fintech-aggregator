// import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  // await prisma.$executeRaw`TRUNCATE TABLE "HongKong" RESTART IDENTITY CASCADE;
  console.log(data)

  // const hongKong = await prisma.hongKong.createMany({
  //   data: data,
  // });

  return NextResponse.json(data);
}
