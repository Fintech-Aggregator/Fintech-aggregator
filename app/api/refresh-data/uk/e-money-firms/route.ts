import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await prisma.$executeRaw`TRUNCATE TABLE "EMoneyFirms" RESTART IDENTITY CASCADE`;

  const chunkSize = 100;
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    await prisma.eMoneyFirms.createMany({
      data: chunk,
    });
  }

  return NextResponse.json("OK");
}
