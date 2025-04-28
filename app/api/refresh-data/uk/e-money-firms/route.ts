import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.error(data)

  // await prisma.$executeRaw`TRUNCATE TABLE "EMoneyFirms" RESTART IDENTITY CASCADE`;
  await prisma.eMoneyFirms.createMany({
    data: data
  });

  return NextResponse.json("OK");
}
