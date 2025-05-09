import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  // await prisma.$executeRaw`TRUNCATE TABLE "FirmPSDPermission" RESTART IDENTITY CASCADE`;
  await prisma.firmPSDPermission.createMany({
    data: data
  });

  return NextResponse.json("OK");
}