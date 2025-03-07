import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const count = await prisma.eMoneyFirms.count();
  if (count > 0) {
    await prisma.$executeRaw`TRUNCATE TABLE "EMoneyFirms" RESTART IDENTITY CASCADE`;
  }

  return NextResponse.json("OK");
}
